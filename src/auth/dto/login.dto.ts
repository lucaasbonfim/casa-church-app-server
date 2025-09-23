import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "O email é um campo obrigatório" })
  @IsEmail({}, { message: "O email enviado é inválido" })
  email: string;

  @IsNotEmpty({ message: "A senha é um campo obrigatório" })
  @IsString({ message: "A senha deve ser do tipo texto" })
  password: string;
}
