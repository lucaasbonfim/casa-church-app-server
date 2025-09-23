import { Injectable } from "@nestjs/common";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;

    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists)
      throw new ConflictException("Não foi possível concluir o cadastro.");

    const user = await this.usersRepository.create(createUserDto);
    return {
      message: "Usuário criado com sucesso",
      user,
    };
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException("Usuário não encontrado");

    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return {
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    };
  }

  async remove(id: string) {
    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException("Usuário não encontrado");

    await this.usersRepository.delete(id);
    return {
      message: "Usuário deletado com sucesso",
    };
  }
}
