import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResendConfirmationEmailDto {
  @ApiProperty({
    example: "anderson.souza@email.com",
    description: "Email que deve receber um novo link de confirmacao",
  })
  @IsNotEmpty({ message: "O email e obrigatorio." })
  @IsEmail({}, { message: "Informe um email valido." })
  email: string;
}
