import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import {
  CREATED_CHURCH_HOUSE_MESSAGE,
  DELETED_CHURCH_HOUSE_MESSAGE,
  NOT_FOUND_CHURCH_HOUSE_MESSAGE,
  UPDATED_CHURCH_HOUSE_MESSAGE,
} from "./church-houses.constants";
import { ChurchHousesRepository } from "./church-houses.repository";
import { CreateChurchHouseDto } from "./dto/create-church-house.dto";
import { FindChurchHousesQueryDto } from "./dto/find-church-houses-query.dto";
import { UpdateChurchHouseDto } from "./dto/update-church-house.dto";

@Injectable()
export class ChurchHousesService {
  constructor(
    private readonly churchHousesRepository: ChurchHousesRepository
  ) {}

  async create(
    createChurchHouseDto: CreateChurchHouseDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const churchHouse = await this.churchHousesRepository.create(
      createChurchHouseDto
    );

    return {
      message: CREATED_CHURCH_HOUSE_MESSAGE,
      churchHouse,
    };
  }

  async findAll(findQuery: FindChurchHousesQueryDto) {
    return this.churchHousesRepository.findAll(findQuery);
  }

  async findOne(id: string) {
    const churchHouse = await this.churchHousesRepository.findById(id);
    if (!churchHouse) {
      throw new NotFoundException(NOT_FOUND_CHURCH_HOUSE_MESSAGE);
    }

    return churchHouse;
  }

  async update(
    id: string,
    updateChurchHouseDto: UpdateChurchHouseDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const churchHouse = await this.churchHousesRepository.findById(id);
    if (!churchHouse) {
      throw new NotFoundException(NOT_FOUND_CHURCH_HOUSE_MESSAGE);
    }

    const updatedChurchHouse = await this.churchHousesRepository.update(
      id,
      updateChurchHouseDto
    );

    return {
      message: UPDATED_CHURCH_HOUSE_MESSAGE,
      churchHouse: updatedChurchHouse,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const churchHouse = await this.churchHousesRepository.findById(id);
    if (!churchHouse) {
      throw new NotFoundException(NOT_FOUND_CHURCH_HOUSE_MESSAGE);
    }

    await this.churchHousesRepository.delete(id);
    return {
      message: DELETED_CHURCH_HOUSE_MESSAGE,
    };
  }
}
