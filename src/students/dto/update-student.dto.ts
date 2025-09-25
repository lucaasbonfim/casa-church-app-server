import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
} from "class-validator";

export class UpdateStudentDto {
  @IsOptional()
  @IsString({ message: "O nome deve ser uma string" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "O email deve ser válido" })
  email?: string;

  @IsOptional()
  @MaxLength(8, { message: "A matrícula deve ter no máximo 8 caracteres" })
  @IsString({ message: "A matrícula deve ser uma string" })
  registration?: string;

  @IsOptional()
  @IsBoolean({ message: "O campo ativo deve ser um booleano" })
  active?: boolean;
}
