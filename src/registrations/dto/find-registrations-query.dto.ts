import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindRegistrationsQueryDto {
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
    example: "dc30bf20-1094-4ee7-b515-9e7d3b2355a4",
    description: "Filtra inscrições pelo ID do usuário (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro usuário deve ser um tipo válido" })
  userId?: string;

  @ApiPropertyOptional({
    example: "66d23d75-a009-46ed-b4f9-d28ab47625bc",
    description: "Filtra inscrições pelo ID do evento (UUID v4)",
  })
  @IsOptional()
  @IsUUID(4, { message: "O parâmetro evento deve ser um tipo válido" })
  eventId?: string;

  @ApiPropertyOptional({
    example: "pending",
    description:
      "Filtra inscrições pelo status (ex: confirmed, pending, canceled)",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro status deve ser um texto" })
  status?: string;

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
