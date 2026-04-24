import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindDevotionalsQueryDto extends FindQueryDto {
  @ApiPropertyOptional({ example: "Descanso" })
  @IsOptional()
  @IsString({ message: "O parametro titulo deve ser um texto." })
  title?: string;

  @ApiPropertyOptional({ example: "2026-04-24" })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parametro data deve ser uma data valida." })
  date?: Date;

  @ApiPropertyOptional({ example: "2026-04-24" })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "A data do devocional deve ser uma data valida." })
  devotionalDate?: Date;

  @ApiPropertyOptional({ example: "2026-04-01" })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "A data inicial deve ser uma data valida." })
  startDate?: Date;

  @ApiPropertyOptional({ example: "2026-04-30" })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "A data final deve ser uma data valida." })
  endDate?: Date;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: "O parametro publicado deve ser booleano." })
  published?: boolean;
}
