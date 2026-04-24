import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiSecurity,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { FindGalleryPhotosQueryDto } from "./dto/find-gallery-photos-query.dto";
import { UploadGalleryPhotoDto } from "./dto/upload-gallery-photo.dto";
import { GalleryService } from "./gallery.service";

@Controller("gallery")
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @ApiOperation({ summary: "Listar pastas disponiveis na galeria" })
  @Get("folders")
  findFolders() {
    return this.galleryService.findFolders();
  }

  @ApiOperation({ summary: "Listar fotos da galeria com ordenacao e filtro" })
  @Get("photos")
  findPhotos(@Query() query: FindGalleryPhotosQueryDto) {
    return this.galleryService.findPhotos(query);
  }

  @ApiOperation({ summary: "Fazer upload de foto para a galeria" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        folder: { type: "string", example: "culto-24-04-2026" },
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 15 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (!file.mimetype?.startsWith("image/")) {
          callback(
            new BadRequestException("Apenas arquivos de imagem sao permitidos."),
            false
          );
          return;
        }

        callback(null, true);
      },
    })
  )
  @Post("upload")
  upload(
    @UploadedFile() file: any,
    @Body() body: UploadGalleryPhotoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.galleryService.uploadPhoto(file, body, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir uma foto da galeria" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Delete("photos")
  removePhoto(
    @Query("publicId") publicId: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.galleryService.removePhoto(publicId, tokenPayload);
  }

  @ApiOperation({ summary: "Excluir uma pasta completa da galeria" })
  @ApiSecurity("auth-token")
  @UseGuards(AuthTokenGuard)
  @Delete("folders")
  removeFolder(
    @Query("folder") folder: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.galleryService.removeFolder(folder, tokenPayload);
  }
}
