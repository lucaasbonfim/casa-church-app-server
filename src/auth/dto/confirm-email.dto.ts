import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmEmailDto {
  @ApiProperty({
    description: "Token recebido no link de confirmacao de email",
  })
  @IsNotEmpty({ message: "O token de confirmacao e obrigatorio." })
  @IsString({ message: "O token de confirmacao deve ser um texto." })
  token: string;
}
