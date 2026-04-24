import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDevotionalDto {
  @ApiProperty({ example: "Descanso para hoje" })
  @IsNotEmpty({ message: "O titulo do devocional nao pode ser vazio." })
  @IsString({ message: "O titulo do devocional deve ser um texto." })
  @MaxLength(160, {
    message: "O titulo do devocional deve ter no maximo 160 caracteres.",
  })
  title: string;

  @ApiProperty({ example: "2026-04-24T12:00:00.000Z" })
  @Type(() => Date)
  @IsDate({ message: "A data do devocional deve ser uma data valida." })
  devotionalDate: Date;

  @ApiPropertyOptional({ example: "Salmos 23:1" })
  @Transform(({ value }) => (value === "" ? undefined : value))
  @IsOptional()
  @IsString({ message: "A referencia biblica deve ser um texto." })
  @MaxLength(120, {
    message: "A referencia biblica deve ter no maximo 120 caracteres.",
  })
  verseReference?: string;

  @ApiPropertyOptional({ example: "O Senhor e o meu pastor; nada me faltara." })
  @Transform(({ value }) => (value === "" ? undefined : value))
  @IsOptional()
  @IsString({ message: "O texto do versiculo deve ser um texto." })
  @MaxLength(500, {
    message: "O texto do versiculo deve ter no maximo 500 caracteres.",
  })
  verseText?: string;

  @ApiProperty({ example: "Uma reflexao para caminhar com Deus hoje." })
  @IsNotEmpty({ message: "O conteudo do devocional nao pode ser vazio." })
  @IsString({ message: "O conteudo do devocional deve ser um texto." })
  @MaxLength(5000, {
    message: "O conteudo do devocional deve ter no maximo 5000 caracteres.",
  })
  content: string;

  @ApiPropertyOptional({ example: "https://exemplo.com/imagem.jpg" })
  @Transform(({ value }) => (value === "" ? undefined : value))
  @IsOptional()
  @IsString({ message: "A URL da imagem deve ser um texto." })
  @IsUrl({}, { message: "A URL da imagem deve ser valida." })
  @MaxLength(2000, {
    message: "A URL da imagem deve ter no maximo 2000 caracteres.",
  })
  imageUrl?: string;

  @ApiPropertyOptional({ example: "https://www.youtube.com/watch?v=abc123" })
  @Transform(({ value }) => (value === "" ? undefined : value))
  @IsOptional()
  @IsString({ message: "A URL do video deve ser um texto." })
  @IsUrl({}, { message: "A URL do video deve ser valida." })
  @MaxLength(2000, {
    message: "A URL do video deve ter no maximo 2000 caracteres.",
  })
  videoUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: "O campo publicado deve ser booleano." })
  published?: boolean;
}
