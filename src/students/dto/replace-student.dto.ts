import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
} from "class-validator";

export class ReplaceStudentDto {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "O email é obrigatório" })
  @IsEmail()
  email: string;

  @MaxLength(8, { message: "A matrícula deve ter no máximo 8 caracteres" })
  @IsString({ message: "A matrícula deve ser uma string" })
  registration?: string;

  @IsBoolean({ message: "O campo ativo deve ser um booleano" })
  active?: boolean;
}
