import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsString,
  IsBoolean,
  IsEmail,
  IsEnum,
} from "class-validator";
import { UserRoles } from "../types/user.types";

export class CreateUserDto {
  @IsNotEmpty({ message: "O campo nome não pode ser vazio." })
  @IsString({ message: "O campo nome deve ser um texto." })
  @MaxLength(150)
  name: string;

  @IsNotEmpty({ message: "O campo email não pode ser vazio." })
  @IsEmail({}, { message: "O campo email deve ser um email válido." })
  @MaxLength(100)
  email: string;

  @IsNotEmpty({ message: "O campo senha não pode ser vazio." })
  @IsString({ message: "O campo senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres" })
  password: string;

  @IsNotEmpty({ message: "O campo cargo não pode ser vazio." })
  @IsEnum(UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." })
  role: UserRoles;

  // @IsOptional()
  // @IsBoolean({ message: "O campo ativo deve ser um booleano." })
  // active?: boolean;
}
