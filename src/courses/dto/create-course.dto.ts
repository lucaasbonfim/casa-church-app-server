import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsNotEmpty,
  IsBoolean,
} from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty({ message: "O campo nome é obrigatório" })
  @IsString({ message: "O campo nome precisa ser do tipo texto" })
  name: string;

  @IsNotEmpty({ message: "O campo descrição é obrigatório" })
  @IsString({ message: "O campo descrição precisa ser do tipo texto" })
  description: string;

  @IsNotEmpty({ message: "O campo duração do curso é obrigatório" })
  @IsInt({ message: "A duração do curso deve ser um número inteiro" })
  @Min(1, { message: "A duração do curso deve ser maior que zero" })
  duration_hours: number;

  @IsOptional()
  @IsBoolean({ message: "O campo ativado/desativo é do tipo boolean" })
  active?: boolean;
}
