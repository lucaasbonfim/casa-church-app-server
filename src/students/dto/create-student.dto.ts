import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateStudentDto {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @IsEmail({}, { message: "O email deve ser válido" })
  email: string;

  @MaxLength(8, { message: "A matrícula deve ter no máximo 8 caracteres" })
  @IsString({ message: "A matrícula é obrigatória" })
  registration: string;

  @IsOptional()
  @IsBoolean({ message: "O campo ativo deve ser um booleano" })
  active?: boolean;
}
