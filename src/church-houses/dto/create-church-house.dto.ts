import { Type } from "class-transformer";
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateChurchHouseDto {
  @ApiProperty({ example: "CI Jardim Primavera" })
  @IsNotEmpty({ message: "O nome do CI nao pode ser vazio." })
  @IsString({ message: "O nome do CI deve ser um texto." })
  @MaxLength(150, { message: "O nome do CI deve ter no maximo 150 caracteres." })
  name: string;

  @ApiPropertyOptional({
    example:
      "Um ponto de encontro da Casa Church para comunhao, discipulado e oracao.",
  })
  @IsOptional()
  @IsString({ message: "A descricao deve ser um texto." })
  @MaxLength(1000, {
    message: "A descricao deve ter no maximo 1000 caracteres.",
  })
  description?: string;

  @ApiProperty({ example: "Rua das Acacias" })
  @IsNotEmpty({ message: "A rua nao pode ser vazia." })
  @IsString({ message: "A rua deve ser um texto." })
  @MaxLength(120, { message: "A rua deve ter no maximo 120 caracteres." })
  street: string;

  @ApiProperty({ example: "145" })
  @IsNotEmpty({ message: "O numero nao pode ser vazio." })
  @IsString({ message: "O numero deve ser um texto." })
  @MaxLength(20, { message: "O numero deve ter no maximo 20 caracteres." })
  number: string;

  @ApiPropertyOptional({ example: "Casa 2" })
  @IsOptional()
  @IsString({ message: "O complemento deve ser um texto." })
  @MaxLength(120, {
    message: "O complemento deve ter no maximo 120 caracteres.",
  })
  complement?: string;

  @ApiProperty({ example: "Jardim Primavera" })
  @IsNotEmpty({ message: "O bairro nao pode ser vazio." })
  @IsString({ message: "O bairro deve ser um texto." })
  @MaxLength(80, { message: "O bairro deve ter no maximo 80 caracteres." })
  neighborhood: string;

  @ApiProperty({ example: "Duque de Caxias" })
  @IsNotEmpty({ message: "A cidade nao pode ser vazia." })
  @IsString({ message: "A cidade deve ser um texto." })
  @MaxLength(80, { message: "A cidade deve ter no maximo 80 caracteres." })
  city: string;

  @ApiProperty({ example: "Rio de Janeiro" })
  @IsNotEmpty({ message: "O estado nao pode ser vazio." })
  @IsString({ message: "O estado deve ser um texto." })
  @MaxLength(80, { message: "O estado deve ter no maximo 80 caracteres." })
  state: string;

  @ApiProperty({ example: "RJ" })
  @IsNotEmpty({ message: "A UF nao pode ser vazia." })
  @IsString({ message: "A UF deve ser um texto." })
  @MaxLength(2, { message: "A UF deve ter no maximo 2 caracteres." })
  uf: string;

  @ApiPropertyOptional({ example: "25065-120" })
  @IsOptional()
  @IsString({ message: "O CEP deve ser um texto." })
  @MaxLength(12, { message: "O CEP deve ter no maximo 12 caracteres." })
  zipCode?: string;

  @ApiPropertyOptional({ example: "Proximo a pracinha principal" })
  @IsOptional()
  @IsString({ message: "A referencia deve ser um texto." })
  @MaxLength(160, {
    message: "A referencia deve ter no maximo 160 caracteres.",
  })
  reference?: string;

  @ApiPropertyOptional({ example: "+55 21 99999-8888" })
  @IsOptional()
  @IsString({ message: "O telefone de contato deve ser um texto." })
  @MaxLength(30, {
    message: "O telefone de contato deve ter no maximo 30 caracteres.",
  })
  contactPhone?: string;

  @ApiPropertyOptional({ example: "Quartas, 20h" })
  @IsOptional()
  @IsString({ message: "A agenda deve ser um texto." })
  @MaxLength(220, { message: "A agenda deve ter no maximo 220 caracteres." })
  meetingSchedule?: string;

  @ApiProperty({ example: -22.756341 })
  @Type(() => Number)
  @IsLatitude({ message: "A latitude informada nao e valida." })
  latitude: number;

  @ApiProperty({ example: -43.302891 })
  @Type(() => Number)
  @IsLongitude({ message: "A longitude informada nao e valida." })
  longitude: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: "O campo ativo deve ser booleano." })
  active?: boolean;
}
