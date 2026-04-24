import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRoles } from "../types/user.types";

export class CreateUserDto {
  @ApiProperty({
    example: "Anderson Souza",
    description: "Nome completo do usuario (max. 150 caracteres)",
  })
  @IsNotEmpty({ message: "O campo nome nao pode ser vazio." })
  @IsString({ message: "O campo nome deve ser um texto." })
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: "anderson.souza@email.com",
    description: "Endereco de e-mail valido do usuario (max. 100 caracteres)",
  })
  @IsNotEmpty({ message: "O campo email nao pode ser vazio." })
  @IsEmail({}, { message: "O campo email deve ser um email valido." })
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: "senhaSegura123",
    description: "Senha de acesso do usuario (min. 6 caracteres)",
  })
  @IsNotEmpty({ message: "O campo senha nao pode ser vazio." })
  @IsString({ message: "O campo senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no minimo 6 caracteres" })
  password: string;

  @ApiProperty({
    example: "user",
    description: "Cargo do usuario dentro do sistema",
    enum: UserRoles,
  })
  @IsNotEmpty({ message: "O campo cargo nao pode ser vazio." })
  @IsEnum(UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." })
  role: UserRoles;

  @ApiPropertyOptional({
    example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    description: "Imagem de perfil em data URL ou URL externa",
  })
  @IsOptional()
  @IsString({ message: "O campo imagem de perfil deve ser um texto." })
  profileImage?: string;
}
