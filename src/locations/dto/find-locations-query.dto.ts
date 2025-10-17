import { IsInt, IsOptional, IsString, IsIn, Min, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindLocationsQueryDto {
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
    example: "Salão Principal",
    description: "Filtra locais pelo nome",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro nome deve ser um texto" })
  name?: string;

  @ApiPropertyOptional({
    example: "Rua das Flores",
    description: "Filtra locais pela rua",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro rua deve ser um texto" })
  street?: string;

  @ApiPropertyOptional({
    example: "Rio de Janeiro",
    description: "Filtra locais pela cidade",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro cidade deve ser um texto" })
  city?: string;

  @ApiPropertyOptional({
    example: "Rio de Janeiro",
    description: "Filtra locais pelo estado",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro estado deve ser um texto" })
  state?: string;

  @ApiPropertyOptional({
    example: "RJ",
    description: "Filtra locais pela UF",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro UF deve ser um texto" })
  uf?: string;

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
  @IsIn(["ASC", "DESC"], { message: "O parâmetro direção deve ser ASC ou DESC" })
  orderDirection: "ASC" | "DESC" = "DESC";
}
