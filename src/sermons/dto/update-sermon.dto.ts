import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from "class-validator";
import { CreateSermonDto } from './create-sermon.dto';

export class UpdateSermonDto extends PartialType(CreateSermonDto) {
    @IsNotEmpty({ message: "O titulo não pode estar vazio" })
    @IsString({ message: "O titulo não está no formato adequado" })
    declare title: string;

    @IsString({ message: "A descricao não está no formato adequado" })
    declare description: string

    @IsNotEmpty({ message: "O createdBy não pode estar vazio" })
    @IsString({ message: "O createdBy não está no formato adequado" })
    declare createdBy: string;
}
