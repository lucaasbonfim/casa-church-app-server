import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSermonDto } from "./dto/create-sermon.dto";
import { UpdateSermonDto } from "./dto/update-sermon.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { SermonsRepository } from "./sermons.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";

@Injectable()
export class SermonsService {
  constructor(private readonly SermonRepository: SermonsRepository) {}

  async create(
    createSermonDto: CreateSermonDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const createdSermon = await this.SermonRepository.create(createSermonDto);

    return {
      message: "Sermão criado com sucesso",
      sermon: createdSermon,
    };
  }

  async findAll() {
    const sermons = await this.SermonRepository.findAll();

    return sermons;
  }

  async findOne(id: string) {
    const sermon = await this.SermonRepository.findById(id);

    if (!sermon) {
      throw new NotFoundException("Sermão não encontrado");
    }

    return sermon;
  }

  async update(
    id: string,
    updateSermonDto: UpdateSermonDto,
    tokenPayload: TokenPayloadDto
  ) {
    const sermonExists = this.findOne(id);

    if (!sermonExists) {
      throw new NotFoundException("Sermão não encontrado");
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const updatedSermon = await this.SermonRepository.update(
      id,
      updateSermonDto
    );

    return {
      message: "Sermão atualizado com sucesso",
      sermon: updatedSermon,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const sermonExists = this.findOne(id);

    if (!sermonExists) {
      throw new NotFoundException("Sermão não encontrado");
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    await this.SermonRepository.delete(id);

    return {
      message: "Sermão deletado com sucesso",
    };
  }
}
