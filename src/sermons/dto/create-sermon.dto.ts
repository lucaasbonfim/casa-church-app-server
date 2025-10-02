import { IsString, IsNotEmpty } from "class-validator";

export class CreateSermonDto {
  @IsNotEmpty({ message: "O título não pode estar vazio" })
  @IsString({ message: "O título não está no formato adequado" })
  declare title: string;

  @IsString({ message: "A descrição não está no formato adequado" })
  declare description: string;

  @IsNotEmpty({ message: "O usuário não pode estar vazio" })
  @IsString({ message: "O usuário não está no formato adequado" })
  declare createdBy: string;
}
