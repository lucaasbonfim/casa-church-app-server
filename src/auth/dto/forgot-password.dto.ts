import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty({
    example: "anderson.souza@email.com",
    description: "Email que deve receber o link de redefinicao de senha",
  })
  @IsNotEmpty({ message: "O email e obrigatorio." })
  @IsEmail({}, { message: "Informe um email valido." })
  email: string;
}
