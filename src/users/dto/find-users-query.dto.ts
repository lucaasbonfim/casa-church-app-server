import { IsInt, IsOptional, IsString, IsIn, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindUsersQueryDto {
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
    example: "Lucas",
    description: "Filtro pelo nome do usuário",
  })
  @IsOptional()
  @IsString({ message: "O parâmetro nome deve ser um texto" })
  name?: string;

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
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
