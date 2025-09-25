import { IsString, IsNotEmpty, IsDate, MaxLength } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty({ message: "O campo título do evento não pode ser vazio." })
  @IsString({ message: "O campo título do evento não é um válido" })
  @MaxLength(255, {
    message: "O título do evento deve ter o tamanho máximo de 255 caracteres",
  })
  title: string;

  @IsNotEmpty({ message: "O campo descrição do evento não pode ser vazio." })
  @IsString({ message: "O campo descrição do evento não é um válido" })
  @MaxLength(500, {
    message:
      "A descrição do evento deve ter o tamanho máximo de 500 caracteres",
  })
  description: string;

  @IsNotEmpty({ message: "O campo data de início não pode ser vazio." })
  @IsDate({ message: 'O campo data de início deve ser do tipo "data"' })
  startDate: Date;

  @IsNotEmpty({ message: "O campo data de término não pode ser vazio." })
  @IsDate({ message: 'O campo data de término deve ser do tipo "data"' })
  endDate: Date;
}
