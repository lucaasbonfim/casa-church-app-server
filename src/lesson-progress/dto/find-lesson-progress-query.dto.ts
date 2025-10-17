import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { UUIDV4 } from "sequelize";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindLessonProgressDto {
  @ApiPropertyOptional({
    example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
    description: "ID da aula no formato UUID v4",
  })
  @IsOptional()
  @Type(() => UUIDV4)
  @IsUUID(4, { message: "O parâmetro aula deve ser uma string" })
  lessonId: string;

  @ApiPropertyOptional({
    example: 1,
    description: "Número da página a ser retornada (mínimo 1)",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um inteiro" })
  @Min(1, { message: "O parâmetro página deve ser no mínimo 1" })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: "Quantidade de registros por página (mínimo 1)",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um inteiro" })
  @Min(1, { message: "O parâmetro limite deve ser no mínimo 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "createdAt",
    description: "Campo utilizado para ordenação dos resultados",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @ApiPropertyOptional({
    example: "DESC",
    enum: ["ASC", "DESC"],
    description: "Direção da ordenação (ASC ou DESC)",
  })
  @IsOptional()
  @IsIn(["ASC", "DESC"], {})
  orderDirection: "ASC" | "DESC" = "DESC";
}
