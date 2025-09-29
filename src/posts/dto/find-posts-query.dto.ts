import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";

export class FindPostsQueryDto {
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
  @IsUUID(4, { message: "O parâmetro usuário deve ser um tipo válido" })
  userId?: string;

  @IsOptional()
  @IsString({ message: "O parâmetro ordenar deve ser um texto" })
  orderBy: string = "createdAt";

  @IsOptional()
  @IsIn(["ASC", "DESC"], {
    message: "O parâmetro direção deve ser ASC ou DESC",
  })
  orderDirection: "ASC" | "DESC" = "DESC";
}
