import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindChurchHousesQueryDto extends FindQueryDto {
  @ApiPropertyOptional({ example: "Jardim" })
  @IsOptional()
  @IsString({ message: "O parametro nome deve ser um texto." })
  name?: string;

  @ApiPropertyOptional({ example: "Duque de Caxias" })
  @IsOptional()
  @IsString({ message: "O parametro cidade deve ser um texto." })
  city?: string;

  @ApiPropertyOptional({ example: "RJ" })
  @IsOptional()
  @IsString({ message: "O parametro UF deve ser um texto." })
  uf?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: "O parametro ativo deve ser booleano." })
  active?: boolean;
}
