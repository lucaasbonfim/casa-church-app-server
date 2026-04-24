import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
  IsArray,
  IsIn,
  ArrayUnique,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  ADMIN_FULL_ACCESS,
  ADMIN_MODULE_VALUES,
  UserRoles,
} from "../types/user.types";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: "Anderson Souza",
    description: "Nome completo do usuario (max. 150 caracteres)",
  })
  @IsOptional()
  @IsString({ message: "O campo nome deve ser um texto." })
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    example: "anderson.souza@email.com",
    description: "Endereco de e-mail valido do usuario (max. 100 caracteres)",
  })
  @IsOptional()
  @IsEmail({}, { message: "O campo email deve ser um email valido." })
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: "senhaSegura123",
    description: "Senha de acesso do usuario (min. 6 caracteres)",
  })
  @IsOptional()
  @IsString({ message: "O campo senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no minimo 6 caracteres" })
  password?: string;

  @ApiPropertyOptional({
    example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    description: "Imagem de perfil em data URL ou URL externa",
  })
  @IsOptional()
  @IsString({ message: "O campo imagem de perfil deve ser um texto." })
  profileImage?: string;

  @ApiPropertyOptional({
    example: "user",
    description: "Cargo do usuario dentro do sistema",
    enum: UserRoles,
  })
  @IsOptional()
  @IsEnum(UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." })
  role?: UserRoles;

  @ApiPropertyOptional({
    example: true,
    description: "Define se o usuario esta ativo ou inativo",
  })
  @IsOptional()
  @IsBoolean({ message: "O campo ativo deve ser um booleano." })
  active?: boolean;

  @ApiPropertyOptional({
    example: ["sermons", "lessons"],
    description:
      "Modulos administrativos liberados para o usuario admin. Use '*' para acesso total.",
    isArray: true,
  })
  @IsOptional()
  @IsArray({ message: "O campo modulos administrativos deve ser uma lista." })
  @ArrayUnique({ message: "Nao repita modulos administrativos." })
  @IsIn([ADMIN_FULL_ACCESS, ...ADMIN_MODULE_VALUES], {
    each: true,
    message: "Modulo administrativo invalido.",
  })
  adminModules?: string[];
}
