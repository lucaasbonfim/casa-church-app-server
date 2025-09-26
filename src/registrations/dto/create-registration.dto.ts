import { IsString, IsNotEmpty } from "class-validator";

export class CreateRegistrationDto {
  @IsNotEmpty({ message: "O campo usuário não pode ser vazio" })
  @IsString({ message: "O campo usuário não está no formato adequado" })
  userId: string;

  @IsNotEmpty({ message: "O campo evento não pode ser vazio" })
  @IsString({ message: "O campo evento não está no formato adequado" })
  eventId: string;
}
