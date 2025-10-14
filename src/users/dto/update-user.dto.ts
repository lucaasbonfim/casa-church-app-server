import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: true,
    description: "Define se o usuário está ativo ou inativo",
  })
  @IsOptional()
  @IsBoolean({ message: "O campo ativo deve ser um booleano." })
  active?: boolean;
}
