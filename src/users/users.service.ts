import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HashService } from "src/auth/hash/hash.service";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "./user.constants";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService
  ) {}

  async create(createUserDto: CreateUserDto, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email
    );
    if (userExists)
      throw new ConflictException("Não foi possível concluir o cadastro.");

    const hashPassword = await this.hashService.hash(createUserDto.password);
    const userData = {
      ...createUserDto,
      password: hashPassword,
    };

    const user = await this.usersRepository.create(userData);
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException("Usuário não encontrado");

    if (updateUserDto.password) {
      const passwordHash = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = passwordHash;
    }

    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return {
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException("Usuário não encontrado");

    await this.usersRepository.delete(id);
    return {
      message: "Usuário deletado com sucesso",
    };
  }
}
