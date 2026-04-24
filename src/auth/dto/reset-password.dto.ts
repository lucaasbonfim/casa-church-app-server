import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: "Token recebido no link de redefinicao de senha",
  })
  @IsNotEmpty({ message: "O token de redefinicao e obrigatorio." })
  @IsString({ message: "O token de redefinicao deve ser um texto." })
  token: string;

  @ApiProperty({
    example: "novaSenha123",
    description: "Nova senha do usuario",
  })
  @IsNotEmpty({ message: "A nova senha e obrigatoria." })
  @IsString({ message: "A nova senha deve ser um texto." })
  @MaxLength(255)
  @MinLength(6, { message: "A senha deve conter no minimo 6 caracteres" })
  password: string;
}
