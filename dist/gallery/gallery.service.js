"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const messages_constants_1 = require("../common/constants/messages.constants");
const user_constants_1 = require("../users/user.constants");
const user_types_1 = require("../users/types/user.types");
let GalleryService = class GalleryService {
    rootFolder;
    configured;
    constructor() {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
        const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
        const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
        this.rootFolder = this.normalizeRootFolder(process.env.GALLERY_ROOT_FOLDER || "casa-church/gallery");
        this.configured = Boolean(cloudName && apiKey && apiSecret);
        if (this.configured) {
            cloudinary_1.v2.config({
                cloud_name: cloudName,
                api_key: apiKey,
                api_secret: apiSecret,
                secure: true,
            });
        }
    }
    async findFolders() {
        this.assertConfigured();
        try {
            const folders = [];
            let nextCursor;
            do {
                const response = await cloudinary_1.v2.api.sub_folders(this.rootFolder, {
                    max_results: 500,
                    next_cursor: nextCursor,
                });
                for (const folder of response?.folders || []) {
                    const relativePath = this.getRelativeFolderPath(folder?.path);
                    if (!relativePath)
                        continue;
                    folders.push({
                        path: relativePath,
                        label: this.toFolderLabel(relativePath),
                    });
                }
                nextCursor = response?.next_cursor;
            } while (nextCursor);
            const deduped = Array.from(new Map(folders.map((folder) => [folder.path, folder])).values()).sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
            const foldersWithStats = await Promise.all(deduped.map(async (folder) => {
                try {
                    return {
                        ...folder,
                        ...(await this.getFolderStats(folder.path)),
                    };
                }
                catch {
                    return {
                        ...folder,
                        count: 0,
                        coverUrl: null,
                        latestPhotoAt: null,
                    };
                }
            }));
            return { folders: foldersWithStats };
        }
        catch (error) {
            const message = String(error?.message || "");
            if (error?.http_code === 404 ||
                message.toLowerCase().includes("can't find folder")) {
                return { folders: [] };
            }
            throw new common_1.BadGatewayException("Nao foi possivel carregar as pastas da galeria.");
        }
    }
    async findPhotos(query) {
        this.assertConfigured();
        const limit = Math.min(Math.max(query.limit || 24, 1), 60);
        const relativeFolder = this.normalizeRelativeFolder(query.folder);
        const result = await this.executeSearch({
            relativeFolder,
            orderDirection: query.orderDirection,
            limit,
            nextCursor: query.nextCursor,
        });
        const resources = (result?.resources || []);
        return {
            photos: resources.map((resource) => this.mapPhoto(resource)),
            total: Number(result?.total_count || resources.length || 0),
            nextCursor: result?.next_cursor || null,
        };
    }
    async uploadPhoto(file, body, tokenPayload) {
        this.assertConfigured();
        this.assertCanManageGallery(tokenPayload);
        if (!file) {
            throw new common_1.BadRequestException("Envie um arquivo de imagem.");
        }
        if (!file.mimetype?.startsWith("image/")) {
            throw new common_1.BadRequestException("Apenas arquivos de imagem sao permitidos.");
        }
        const relativeFolder = this.normalizeRelativeFolder(body.folder) || "geral";
        const targetFolder = `${this.rootFolder}/${relativeFolder}`;
        const folderBaseName = this.getFolderBaseName(relativeFolder);
        let nextIndex = (await this.getFolderPhotoCount(relativeFolder)) + 1;
        for (let attempt = 0; attempt < 150; attempt += 1) {
            const publicId = `${folderBaseName}-${nextIndex}`;
            try {
                const uploaded = await this.uploadToCloudinary(file.buffer, {
                    folder: targetFolder,
                    public_id: publicId,
                    resource_type: "image",
                    use_filename: false,
                    unique_filename: false,
                    overwrite: false,
                    tags: ["casa-church", "gallery"],
                });
                return {
                    message: "Imagem enviada com sucesso.",
                    photo: this.mapPhoto(uploaded),
                };
            }
            catch (error) {
                if (this.isUploadConflictError(error)) {
                    nextIndex += 1;
                    continue;
                }
                throw new common_1.BadGatewayException("Nao foi possivel enviar a imagem para o storage.");
            }
        }
        throw new common_1.BadGatewayException("Nao foi possivel enviar a imagem para o storage.");
    }
    async removePhoto(publicId, tokenPayload) {
        this.assertConfigured();
        this.assertCanManageGallery(tokenPayload);
        const normalizedPublicId = this.normalizePublicId(publicId);
        if (!normalizedPublicId) {
            throw new common_1.BadRequestException("Informe um publicId valido.");
        }
        if (!this.isManagedPublicId(normalizedPublicId)) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        try {
            const result = await cloudinary_1.v2.uploader.destroy(normalizedPublicId, {
                resource_type: "image",
                type: "upload",
                invalidate: true,
            });
            if (result?.result !== "ok" && result?.result !== "not found") {
                throw new Error("Falha ao excluir foto.");
            }
            return {
                message: "Foto removida com sucesso.",
            };
        }
        catch {
            throw new common_1.BadGatewayException("Nao foi possivel remover a foto da galeria.");
        }
    }
    async removeFolder(folder, tokenPayload) {
        this.assertConfigured();
        this.assertCanManageGallery(tokenPayload);
        const relativeFolder = this.normalizeRelativeFolder(folder);
        if (!relativeFolder) {
            throw new common_1.BadRequestException("Informe uma pasta valida.");
        }
        const folderPath = `${this.rootFolder}/${relativeFolder}`;
        try {
            await this.deleteFolderRecursively(folderPath);
            return {
                message: "Pasta removida com sucesso.",
            };
        }
        catch {
            throw new common_1.BadGatewayException("Nao foi possivel remover a pasta da galeria.");
        }
    }
    assertConfigured() {
        if (!this.configured) {
            throw new common_1.ServiceUnavailableException("Storage de imagens nao configurado. Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET.");
        }
    }
    assertCanManageGallery(tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const modules = Array.isArray(tokenPayload.adminModules)
            ? tokenPayload.adminModules
            : [];
        const canUploadGallery = modules.includes(user_types_1.ADMIN_FULL_ACCESS) ||
            modules.includes(user_types_1.AdminModules.GALLERY) ||
            modules.includes(user_types_1.AdminModules.EVENTS) ||
            modules.includes(user_types_1.AdminModules.POSTS);
        if (!canUploadGallery) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
    }
    async deleteFolderRecursively(folderPath) {
        const normalizedFolder = folderPath.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
        if (!normalizedFolder || normalizedFolder === this.rootFolder) {
            throw new common_1.BadRequestException("Nao e permitido remover a pasta raiz da galeria.");
        }
        const subFolders = await this.getSubFolders(normalizedFolder);
        for (const subFolderPath of subFolders) {
            await this.deleteFolderRecursively(subFolderPath);
        }
        await this.deleteImagesByPrefix(`${normalizedFolder}/`);
        try {
            await cloudinary_1.v2.api.delete_folder(normalizedFolder);
        }
        catch (error) {
            const message = String(error?.message || "").toLowerCase();
            const notFound = error?.http_code === 404 ||
                message.includes("can't find folder") ||
                message.includes("not found");
            if (!notFound) {
                throw error;
            }
        }
    }
    async getSubFolders(folderPath) {
        const paths = [];
        let nextCursor;
        do {
            try {
                const response = await cloudinary_1.v2.api.sub_folders(folderPath, {
                    max_results: 500,
                    next_cursor: nextCursor,
                });
                for (const folder of response?.folders || []) {
                    const path = String(folder?.path || "").replace(/\\/g, "/");
                    if (path) {
                        paths.push(path);
                    }
                }
                nextCursor = response?.next_cursor;
            }
            catch (error) {
                const message = String(error?.message || "").toLowerCase();
                const notFound = error?.http_code === 404 ||
                    message.includes("can't find folder") ||
                    message.includes("not found");
                if (notFound) {
                    return [];
                }
                throw error;
            }
        } while (nextCursor);
        return paths;
    }
    async deleteImagesByPrefix(prefix) {
        let nextCursor;
        do {
            const response = await cloudinary_1.v2.api.resources({
                type: "upload",
                resource_type: "image",
                prefix,
                max_results: 500,
                next_cursor: nextCursor,
            });
            const publicIds = (response?.resources || [])
                .map((resource) => String(resource?.public_id || ""))
                .filter(Boolean);
            if (publicIds.length > 0) {
                await cloudinary_1.v2.api.delete_resources(publicIds, {
                    type: "upload",
                    resource_type: "image",
                    invalidate: true,
                });
            }
            nextCursor = response?.next_cursor;
        } while (nextCursor);
    }
    mapPhoto(resource) {
        const folderPath = this.getFolderPathFromPublicId(resource.public_id);
        return {
            id: resource.asset_id || resource.public_id,
            publicId: resource.public_id,
            url: resource.secure_url || resource.url || "",
            width: resource.width || null,
            height: resource.height || null,
            format: resource.format || null,
            sizeInBytes: resource.bytes || null,
            createdAt: resource.created_at || null,
            folder: folderPath,
            folderLabel: this.toFolderLabel(folderPath),
        };
    }
    async getFolderStats(relativeFolder) {
        const result = await this.executeSearch({
            relativeFolder,
            orderDirection: "DESC",
            limit: 1,
        });
        const resources = (result?.resources || []);
        const cover = resources[0];
        return {
            count: Number(result?.total_count || resources.length || 0),
            coverUrl: cover?.secure_url || cover?.url || null,
            latestPhotoAt: cover?.created_at || null,
        };
    }
    async getFolderPhotoCount(relativeFolder) {
        try {
            const result = await this.executeSearch({
                relativeFolder,
                orderDirection: "DESC",
                limit: 1,
            });
            return Number(result?.total_count || 0);
        }
        catch {
            return 0;
        }
    }
    async executeSearch(params) {
        const relativeFolder = this.normalizeRelativeFolder(params.relativeFolder);
        const direction = params.orderDirection === "ASC" ? "asc" : "desc";
        const limit = Math.min(Math.max(params.limit || 24, 1), 60);
        const prefix = relativeFolder
            ? `${this.rootFolder}/${relativeFolder}/`
            : `${this.rootFolder}/`;
        const fallbackFolder = relativeFolder
            ? `${this.rootFolder}/${relativeFolder}`
            : this.rootFolder;
        const expressions = [
            `resource_type:image AND type:upload AND public_id:${prefix}*`,
            `resource_type:image AND type:upload AND folder="${fallbackFolder}"`,
            `resource_type:image AND type:upload AND asset_folder="${fallbackFolder}"`,
        ];
        for (const expression of expressions) {
            try {
                let search = cloudinary_1.v2.search
                    .expression(expression)
                    .sort_by("created_at", direction)
                    .max_results(limit);
                if (params.nextCursor) {
                    search = search.next_cursor(params.nextCursor);
                }
                return await search.execute();
            }
            catch {
                continue;
            }
        }
        throw new common_1.BadGatewayException("Nao foi possivel carregar as fotos da galeria.");
    }
    async uploadToCloudinary(buffer, options) {
        return await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream(options, (error, result) => {
                if (error || !result) {
                    reject(error || new Error("Falha ao enviar imagem."));
                    return;
                }
                resolve(result);
            });
            stream.end(buffer);
        });
    }
    isUploadConflictError(error) {
        const message = String(error?.message || "").toLowerCase();
        return error?.http_code === 409 || message.includes("already exists");
    }
    getFolderBaseName(relativeFolder) {
        const segments = relativeFolder.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1] || "galeria";
        return this.sanitizeSegment(lastSegment) || "foto";
    }
    normalizeRootFolder(folder) {
        return folder
            .replace(/\\/g, "/")
            .replace(/^\/+|\/+$/g, "")
            .split("/")
            .map((segment) => this.sanitizeSegment(segment))
            .filter(Boolean)
            .join("/");
    }
    normalizeRelativeFolder(folder) {
        if (!folder)
            return "";
        const normalized = folder
            .replace(/\\/g, "/")
            .replace(/^\/+|\/+$/g, "")
            .trim();
        if (!normalized)
            return "";
        const withoutRootPrefix = normalized.startsWith(`${this.rootFolder}/`)
            ? normalized.slice(this.rootFolder.length + 1)
            : normalized;
        return withoutRootPrefix
            .split("/")
            .map((segment) => this.sanitizeSegment(segment))
            .filter(Boolean)
            .join("/");
    }
    sanitizeSegment(segment) {
        return segment
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9-_ ]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }
    getRelativeFolderPath(path) {
        if (!path)
            return "";
        const normalized = path.replace(/\\/g, "/");
        if (normalized === this.rootFolder)
            return "";
        if (normalized.startsWith(`${this.rootFolder}/`)) {
            return normalized.slice(this.rootFolder.length + 1);
        }
        return this.normalizeRelativeFolder(normalized);
    }
    getFolderPathFromPublicId(publicId) {
        if (!publicId)
            return "";
        const normalized = publicId.replace(/\\/g, "/");
        const withoutRootPrefix = normalized.startsWith(`${this.rootFolder}/`)
            ? normalized.slice(this.rootFolder.length + 1)
            : normalized;
        const lastSlash = withoutRootPrefix.lastIndexOf("/");
        if (lastSlash <= 0)
            return "";
        return withoutRootPrefix.slice(0, lastSlash);
    }
    toFolderLabel(path) {
        if (!path)
            return "Geral";
        return path
            .split("/")
            .map((segment) => segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()))
            .join(" / ");
    }
    normalizePublicId(publicId) {
        if (!publicId || typeof publicId !== "string")
            return "";
        let decoded = publicId;
        try {
            decoded = decodeURIComponent(publicId);
        }
        catch {
            decoded = publicId;
        }
        return decoded.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    }
    isManagedPublicId(publicId) {
        const normalized = this.normalizePublicId(publicId);
        return normalized.startsWith(`${this.rootFolder}/`);
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map