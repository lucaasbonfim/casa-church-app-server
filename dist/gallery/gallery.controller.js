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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const find_gallery_photos_query_dto_1 = require("./dto/find-gallery-photos-query.dto");
const upload_gallery_photo_dto_1 = require("./dto/upload-gallery-photo.dto");
const gallery_service_1 = require("./gallery.service");
let GalleryController = class GalleryController {
    galleryService;
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    findFolders() {
        return this.galleryService.findFolders();
    }
    findPhotos(query) {
        return this.galleryService.findPhotos(query);
    }
    upload(file, body, tokenPayload) {
        return this.galleryService.uploadPhoto(file, body, tokenPayload);
    }
    removePhoto(publicId, tokenPayload) {
        return this.galleryService.removePhoto(publicId, tokenPayload);
    }
    removeFolder(folder, tokenPayload) {
        return this.galleryService.removeFolder(folder, tokenPayload);
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar pastas disponiveis na galeria" }),
    (0, common_1.Get)("folders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "findFolders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar fotos da galeria com ordenacao e filtro" }),
    (0, common_1.Get)("photos"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_gallery_photos_query_dto_1.FindGalleryPhotosQueryDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "findPhotos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Fazer upload de foto para a galeria" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                folder: { type: "string", example: "culto-24-04-2026" },
                file: { type: "string", format: "binary" },
            },
            required: ["file"],
        },
    }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 15 * 1024 * 1024 },
        fileFilter: (_request, file, callback) => {
            if (!file.mimetype?.startsWith("image/")) {
                callback(new common_1.BadRequestException("Apenas arquivos de imagem sao permitidos."), false);
                return;
            }
            callback(null, true);
        },
    })),
    (0, common_1.Post)("upload"),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_gallery_photo_dto_1.UploadGalleryPhotoDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "upload", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir uma foto da galeria" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Delete)("photos"),
    __param(0, (0, common_1.Query)("publicId")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "removePhoto", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir uma pasta completa da galeria" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Delete)("folders"),
    __param(0, (0, common_1.Query)("folder")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "removeFolder", null);
exports.GalleryController = GalleryController = __decorate([
    (0, common_1.Controller)("gallery"),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map