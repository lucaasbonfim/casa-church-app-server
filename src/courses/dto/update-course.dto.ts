import { IsOptional, IsString, IsInt, Min, IsBoolean } from "class-validator";

export class UpdateCourseDto {
  @IsOptional()
  @IsString({ message: "O campo nome precisa ser do tipo texto" })
  name?: string;

  @IsOptional()
  @IsString({ message: "O campo descrição precisa ser do tipo texto" })
  description?: string;

  @IsOptional()
  @IsInt({ message: "A duração do curso deve ser um número inteiro" })
  @Min(1, { message: "A duração do curso deve ser maior que zero" })
  duration_hours?: number;

  @IsOptional()
  @IsBoolean({ message: "O campo ativado/desativo é do tipo boolean" })
  active?: boolean;
}
