import { IsString, IsNotEmpty } from "class-validator";

export class UpdateRegistrationDto {
  @IsString({ message: "O status da inscrição deve ser do tipo string" })
  @IsNotEmpty({ message: "O status da inscrição não pode ser vazio" })
  status: string;
}
