import { Transform, Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class FindGalleryPhotosQueryDto {
  @ApiPropertyOptional({
    description: "Pasta para filtrar as fotos (ex: culto-24-04-2026)",
    example: "culto-24-04-2026",
  })
  @IsOptional()
  @IsString({ message: "O campo folder deve ser um texto." })
  folder?: string;

  @ApiPropertyOptional({
    description: "Ordenacao cronologica das fotos",
    enum: ["ASC", "DESC"],
    example: "DESC",
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? value.toUpperCase() : value
  )
  @IsIn(["ASC", "DESC"], { message: "orderDirection deve ser ASC ou DESC." })
  orderDirection: "ASC" | "DESC" = "DESC";

  @ApiPropertyOptional({
    description: "Quantidade de fotos por pagina",
    example: 24,
    minimum: 1,
    maximum: 60,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O campo limit deve ser um numero inteiro." })
  @Min(1, { message: "O campo limit deve ser no minimo 1." })
  @Max(60, { message: "O campo limit deve ser no maximo 60." })
  limit: number = 24;

  @ApiPropertyOptional({
    description: "Cursor para carregar a proxima pagina de fotos",
  })
  @IsOptional()
  @IsString({ message: "O campo nextCursor deve ser um texto." })
  nextCursor?: string;
}
