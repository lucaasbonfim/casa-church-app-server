import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { CreateDevotionalDto } from "./dto/create-devotional.dto";
import { FindDevotionalsQueryDto } from "./dto/find-devotionals-query.dto";
import { UpdateDevotionalDto } from "./dto/update-devotional.dto";
import {
  CREATED_DEVOTIONAL_MESSAGE,
  DELETED_DEVOTIONAL_MESSAGE,
  NOT_FOUND_DEVOTIONAL_MESSAGE,
  UPDATED_DEVOTIONAL_MESSAGE,
} from "./devotionals.constants";
import { DevotionalsRepository } from "./devotionals.repository";

@Injectable()
export class DevotionalsService {
  constructor(
    private readonly devotionalsRepository: DevotionalsRepository
  ) {}

  async create(
    createDevotionalDto: CreateDevotionalDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const devotional = await this.devotionalsRepository.create({
      ...createDevotionalDto,
      createdBy: tokenPayload.id,
    });

    return {
      message: CREATED_DEVOTIONAL_MESSAGE,
      devotional,
    };
  }

  async findAll(findQuery: FindDevotionalsQueryDto) {
    return this.devotionalsRepository.findAll(findQuery);
  }

  async findOne(id: string) {
    const devotional = await this.devotionalsRepository.findById(id);
    if (!devotional) {
      throw new NotFoundException(NOT_FOUND_DEVOTIONAL_MESSAGE);
    }

    return devotional;
  }

  async update(
    id: string,
    updateDevotionalDto: UpdateDevotionalDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const devotional = await this.devotionalsRepository.findById(id);
    if (!devotional) {
      throw new NotFoundException(NOT_FOUND_DEVOTIONAL_MESSAGE);
    }

    const updatedDevotional = await this.devotionalsRepository.update(
      id,
      updateDevotionalDto
    );

    return {
      message: UPDATED_DEVOTIONAL_MESSAGE,
      devotional: updatedDevotional,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const devotional = await this.devotionalsRepository.findById(id);
    if (!devotional) {
      throw new NotFoundException(NOT_FOUND_DEVOTIONAL_MESSAGE);
    }

    await this.devotionalsRepository.delete(id);
    return {
      message: DELETED_DEVOTIONAL_MESSAGE,
    };
  }
}
