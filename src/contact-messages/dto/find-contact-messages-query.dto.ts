import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { FindQueryDto } from "src/common/dto/find-query.dto";

export class FindContactMessagesQueryDto extends FindQueryDto {
  @ApiPropertyOptional({
    example: "contato@casachurch.com",
    description: "Filtra mensagens pelo email do remetente",
  })
  @IsOptional()
  @IsEmail({}, { message: "O parametro email deve ser um email valido." })
  email?: string;
}
