import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";

export class FindEventsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro página deve ser um inteiro" })
  @Min(1, { message: "O parâmetro página deve ser no mínimo 1" })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "O parâmetro limite deve ser um inteiro" })
  @Min(1, { message: "O parâmetro limite deve ser no mínimo 1" })
  limit: number = 10;

  @IsOptional()
  @IsString({ message: "O parâmetro título deve ser um texto" })
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de início deve ser uma data válida" })
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "O parâmetro data de término deve ser uma data válida" })
  endDate?: Date;

  @IsOptional()
  @IsUUID(4, { message: "O parâmetro autor deve ser um tipo válido" })
  createdBy?: string;

  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @IsOptional()
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
