import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UploadGalleryPhotoDto {
  @ApiPropertyOptional({
    description: "Pasta onde a foto sera salva",
    example: "culto-24-04-2026",
  })
  @IsOptional()
  @IsString({ message: "O campo folder deve ser um texto." })
  @MaxLength(120, { message: "O campo folder deve ter no maximo 120 caracteres." })
  folder?: string;
}
