import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindEventFeedbacksQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: "Número da página para paginação (valor padrão: 1)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um inteiro" })
  @Min(1, { message: "O parâmetro página deve ser no mínimo 1" })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: "Quantidade máxima de registros por página (valor padrão: 10)",
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um inteiro" })
  @Min(1, { message: "O parâmetro limite deve ser no mínimo 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Filtra as avaliações pelo ID do evento",
  })
  @IsOptional()
  @IsUUID("4", { message: "O parâmetro evento deve ser um valor válido" })
  eventId?: string;

  @ApiPropertyOptional({
    example: 5,
    description: "Filtra as avaliações pela nota (1 a 5)",
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro nota deve ser um inteiro" })
  @Min(1, { message: "O parâmetro nota deve ser no mínimo 1" })
  @Max(5, { message: "O parâmetro nota deve ser no máximo 5" })
  rating?: number;

  @ApiPropertyOptional({
    example: "createdAt",
    description:
      "Campo usado para ordenar os resultados (valor padrão: createdAt)",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @ApiPropertyOptional({
    example: "DESC",
    description: "Direção da ordenação: ASC ou DESC (valor padrão: DESC)",
    enum: ["ASC", "DESC"],
  })
  @IsOptional()
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
