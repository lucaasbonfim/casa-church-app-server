import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { ADMIN_FULL_ACCESS, AdminModules } from "src/users/types/user.types";
import { FindGalleryPhotosQueryDto } from "./dto/find-gallery-photos-query.dto";
import { UploadGalleryPhotoDto } from "./dto/upload-gallery-photo.dto";

type CloudinarySearchResource = {
  asset_id?: string;
  public_id: string;
  secure_url?: string;
  url?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  created_at?: string;
};

@Injectable()
export class GalleryService {
  private readonly rootFolder: string;
  private readonly configured: boolean;

  constructor() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    this.rootFolder = this.normalizeRootFolder(
      process.env.GALLERY_ROOT_FOLDER || "casa-church/gallery"
    );

    this.configured = Boolean(cloudName && apiKey && apiSecret);

    if (this.configured) {
      cloudinary.config({
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
      const folders: Array<{ path: string; label: string }> = [];
      let nextCursor: string | undefined;

      do {
        const response = await cloudinary.api.sub_folders(this.rootFolder, {
          max_results: 500,
          next_cursor: nextCursor,
        });

        for (const folder of response?.folders || []) {
          const relativePath = this.getRelativeFolderPath(folder?.path);
          if (!relativePath) continue;

          folders.push({
            path: relativePath,
            label: this.toFolderLabel(relativePath),
          });
        }

        nextCursor = response?.next_cursor;
      } while (nextCursor);

      const deduped = Array.from(
        new Map(folders.map((folder) => [folder.path, folder])).values()
      ).sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

      const foldersWithStats = await Promise.all(
        deduped.map(async (folder) => {
          try {
            return {
              ...folder,
              ...(await this.getFolderStats(folder.path)),
            };
          } catch {
            return {
              ...folder,
              count: 0,
              coverUrl: null,
              latestPhotoAt: null,
            };
          }
        })
      );

      return { folders: foldersWithStats };
    } catch (error: any) {
      const message = String(error?.message || "");
      if (
        error?.http_code === 404 ||
        message.toLowerCase().includes("can't find folder")
      ) {
        return { folders: [] };
      }

      throw new BadGatewayException(
        "Nao foi possivel carregar as pastas da galeria."
      );
    }
  }

  async findPhotos(query: FindGalleryPhotosQueryDto) {
    this.assertConfigured();

    const limit = Math.min(Math.max(query.limit || 24, 1), 60);
    const relativeFolder = this.normalizeRelativeFolder(query.folder);
    const result = await this.executeSearch({
      relativeFolder,
      orderDirection: query.orderDirection,
      limit,
      nextCursor: query.nextCursor,
    });

    const resources = (result?.resources || []) as CloudinarySearchResource[];

    return {
      photos: resources.map((resource) => this.mapPhoto(resource)),
      total: Number(result?.total_count || resources.length || 0),
      nextCursor: result?.next_cursor || null,
    };
  }

  async uploadPhoto(
    file: any,
    body: UploadGalleryPhotoDto,
    tokenPayload: TokenPayloadDto
  ) {
    this.assertConfigured();
    this.assertCanManageGallery(tokenPayload);

    if (!file) {
      throw new BadRequestException("Envie um arquivo de imagem.");
    }

    if (!file.mimetype?.startsWith("image/")) {
      throw new BadRequestException("Apenas arquivos de imagem sao permitidos.");
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
      } catch (error: any) {
        if (this.isUploadConflictError(error)) {
          nextIndex += 1;
          continue;
        }

        throw new BadGatewayException(
          "Nao foi possivel enviar a imagem para o storage."
        );
      }
    }

    throw new BadGatewayException(
      "Nao foi possivel enviar a imagem para o storage."
    );
  }

  async removePhoto(publicId: string, tokenPayload: TokenPayloadDto) {
    this.assertConfigured();
    this.assertCanManageGallery(tokenPayload);

    const normalizedPublicId = this.normalizePublicId(publicId);
    if (!normalizedPublicId) {
      throw new BadRequestException("Informe um publicId valido.");
    }

    if (!this.isManagedPublicId(normalizedPublicId)) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    try {
      const result = await cloudinary.uploader.destroy(normalizedPublicId, {
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
    } catch {
      throw new BadGatewayException(
        "Nao foi possivel remover a foto da galeria."
      );
    }
  }

  async removeFolder(folder: string, tokenPayload: TokenPayloadDto) {
    this.assertConfigured();
    this.assertCanManageGallery(tokenPayload);

    const relativeFolder = this.normalizeRelativeFolder(folder);
    if (!relativeFolder) {
      throw new BadRequestException("Informe uma pasta valida.");
    }

    const folderPath = `${this.rootFolder}/${relativeFolder}`;

    try {
      await this.deleteFolderRecursively(folderPath);

      return {
        message: "Pasta removida com sucesso.",
      };
    } catch {
      throw new BadGatewayException(
        "Nao foi possivel remover a pasta da galeria."
      );
    }
  }

  private assertConfigured() {
    if (!this.configured) {
      throw new ServiceUnavailableException(
        "Storage de imagens nao configurado. Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET."
      );
    }
  }

  private assertCanManageGallery(tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const modules = Array.isArray(tokenPayload.adminModules)
      ? tokenPayload.adminModules
      : [];
    const canUploadGallery =
      modules.includes(ADMIN_FULL_ACCESS) ||
      modules.includes(AdminModules.GALLERY) ||
      modules.includes(AdminModules.EVENTS) ||
      modules.includes(AdminModules.POSTS);

    if (!canUploadGallery) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }
  }

  private async deleteFolderRecursively(folderPath: string) {
    const normalizedFolder = folderPath.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    if (!normalizedFolder || normalizedFolder === this.rootFolder) {
      throw new BadRequestException("Nao e permitido remover a pasta raiz da galeria.");
    }

    const subFolders = await this.getSubFolders(normalizedFolder);
    for (const subFolderPath of subFolders) {
      await this.deleteFolderRecursively(subFolderPath);
    }

    await this.deleteImagesByPrefix(`${normalizedFolder}/`);

    try {
      await cloudinary.api.delete_folder(normalizedFolder);
    } catch (error: any) {
      const message = String(error?.message || "").toLowerCase();
      const notFound =
        error?.http_code === 404 ||
        message.includes("can't find folder") ||
        message.includes("not found");

      if (!notFound) {
        throw error;
      }
    }
  }

  private async getSubFolders(folderPath: string) {
    const paths: string[] = [];
    let nextCursor: string | undefined;

    do {
      try {
        const response = await cloudinary.api.sub_folders(folderPath, {
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
      } catch (error: any) {
        const message = String(error?.message || "").toLowerCase();
        const notFound =
          error?.http_code === 404 ||
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

  private async deleteImagesByPrefix(prefix: string) {
    let nextCursor: string | undefined;

    do {
      const response = await cloudinary.api.resources({
        type: "upload",
        resource_type: "image",
        prefix,
        max_results: 500,
        next_cursor: nextCursor,
      });

      const publicIds = (response?.resources || [])
        .map((resource: any) => String(resource?.public_id || ""))
        .filter(Boolean);

      if (publicIds.length > 0) {
        await cloudinary.api.delete_resources(publicIds, {
          type: "upload",
          resource_type: "image",
          invalidate: true,
        });
      }

      nextCursor = response?.next_cursor;
    } while (nextCursor);
  }

  private mapPhoto(resource: CloudinarySearchResource) {
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

  private async getFolderStats(relativeFolder: string) {
    const result = await this.executeSearch({
      relativeFolder,
      orderDirection: "DESC",
      limit: 1,
    });

    const resources = (result?.resources || []) as CloudinarySearchResource[];
    const cover = resources[0];

    return {
      count: Number(result?.total_count || resources.length || 0),
      coverUrl: cover?.secure_url || cover?.url || null,
      latestPhotoAt: cover?.created_at || null,
    };
  }

  private async getFolderPhotoCount(relativeFolder: string) {
    try {
      const result = await this.executeSearch({
        relativeFolder,
        orderDirection: "DESC",
        limit: 1,
      });

      return Number(result?.total_count || 0);
    } catch {
      return 0;
    }
  }

  private async executeSearch(params: {
    relativeFolder?: string;
    orderDirection?: "ASC" | "DESC";
    limit: number;
    nextCursor?: string;
  }) {
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
        let search = cloudinary.search
          .expression(expression)
          .sort_by("created_at", direction)
          .max_results(limit);

        if (params.nextCursor) {
          search = search.next_cursor(params.nextCursor);
        }

        return await search.execute();
      } catch {
        continue;
      }
    }

    throw new BadGatewayException(
      "Nao foi possivel carregar as fotos da galeria."
    );
  }

  private async uploadToCloudinary(buffer: Buffer, options: any) {
    return await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error || !result) {
          reject(error || new Error("Falha ao enviar imagem."));
          return;
        }

        resolve(result);
      });

      stream.end(buffer);
    });
  }

  private isUploadConflictError(error: any) {
    const message = String(error?.message || "").toLowerCase();
    return error?.http_code === 409 || message.includes("already exists");
  }

  private getFolderBaseName(relativeFolder: string) {
    const segments = relativeFolder.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "galeria";
    return this.sanitizeSegment(lastSegment) || "foto";
  }

  private normalizeRootFolder(folder: string) {
    return folder
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .map((segment) => this.sanitizeSegment(segment))
      .filter(Boolean)
      .join("/");
  }

  private normalizeRelativeFolder(folder?: string) {
    if (!folder) return "";

    const normalized = folder
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "")
      .trim();

    if (!normalized) return "";

    const withoutRootPrefix = normalized.startsWith(`${this.rootFolder}/`)
      ? normalized.slice(this.rootFolder.length + 1)
      : normalized;

    return withoutRootPrefix
      .split("/")
      .map((segment) => this.sanitizeSegment(segment))
      .filter(Boolean)
      .join("/");
  }

  private sanitizeSegment(segment: string) {
    return segment
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9-_ ]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  private getRelativeFolderPath(path?: string) {
    if (!path) return "";

    const normalized = path.replace(/\\/g, "/");
    if (normalized === this.rootFolder) return "";

    if (normalized.startsWith(`${this.rootFolder}/`)) {
      return normalized.slice(this.rootFolder.length + 1);
    }

    return this.normalizeRelativeFolder(normalized);
  }

  private getFolderPathFromPublicId(publicId: string) {
    if (!publicId) return "";

    const normalized = publicId.replace(/\\/g, "/");
    const withoutRootPrefix = normalized.startsWith(`${this.rootFolder}/`)
      ? normalized.slice(this.rootFolder.length + 1)
      : normalized;

    const lastSlash = withoutRootPrefix.lastIndexOf("/");
    if (lastSlash <= 0) return "";

    return withoutRootPrefix.slice(0, lastSlash);
  }

  private toFolderLabel(path: string) {
    if (!path) return "Geral";

    return path
      .split("/")
      .map((segment) =>
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(" / ");
  }

  private normalizePublicId(publicId?: string) {
    if (!publicId || typeof publicId !== "string") return "";

    let decoded = publicId;
    try {
      decoded = decodeURIComponent(publicId);
    } catch {
      decoded = publicId;
    }

    return decoded.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  }

  private isManagedPublicId(publicId: string) {
    const normalized = this.normalizePublicId(publicId);
    return normalized.startsWith(`${this.rootFolder}/`);
  }
}
