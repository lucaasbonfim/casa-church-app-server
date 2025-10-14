import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRegistrationDto {
  @ApiProperty({
    example: "confirmed",
    description: "Novo status da inscrição (ex: confirmed, pending, canceled)",
  })
  @IsString({ message: "O status da inscrição deve ser do tipo string" })
  @IsNotEmpty({ message: "O status da inscrição não pode ser vazio" })
  status: string;
}
