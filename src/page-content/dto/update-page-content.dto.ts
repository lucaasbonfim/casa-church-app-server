import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class UpdatePageContentDto {
  @ApiProperty({
    description: "Conteudo estruturado da pagina",
  })
  @IsObject({ message: "O conteudo da pagina deve ser um objeto." })
  content: Record<string, any>;
}
