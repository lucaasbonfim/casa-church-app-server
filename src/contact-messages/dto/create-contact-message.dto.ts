import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class CreateContactMessageDto {
    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.' })
    @IsString({ message: 'O campo nome não é um válido' })
    @MaxLength(100, { message: 'O nome deve ter o tamanho máximo de 100 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'O campo email não pode ser vazio.' })
    @IsEmail({}, { message: 'O campo email não é um válido' })
    @MaxLength(100, { message: 'O email deve ter o tamanho máximo de 100 caracteres' })
    email: string;

    @IsNotEmpty({ message: 'O campo assunto não pode ser vazio.' })
    @IsString({ message: 'O campo assunto não é um válido' })
    @MaxLength(150, { message: 'O assunto deve ter o tamanho máximo de 150 caracteres' })
    subject: string;

    @IsNotEmpty({ message: 'O campo mensagem não pode ser vazio.' })
    @IsString({ message: 'O campo mensagem não é um válido' })
    @MaxLength(1000, { message: 'A mensagem deve ter o tamanho máximo de 1000 caracteres' })
    message: string;
}
