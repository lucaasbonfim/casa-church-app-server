import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { UpdateRegistrationDto } from "./dto/update-registration.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { RegistrationsRepotisory } from "./registrations.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationRepository: RegistrationsRepotisory
  ) {}

  async create(
    createRegistrationDto: CreateRegistrationDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      createRegistrationDto.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const existing = await this.registrationRepository.findByUserAndEvent(
      createRegistrationDto.userId,
      createRegistrationDto.eventId
    );
    if (existing)
      throw new ConflictException("Usuário já cadastrado nesse evento");

    const createdRegistration = await this.registrationRepository.create(
      createRegistrationDto
    );

    return {
      message: "Inscrição realizada com sucesso",
      registration: createdRegistration,
    };
  }

  async findAll(tokenPayload: TokenPayloadDto, userId?: string | undefined) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && userId !== tokenPayload.id) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const registrations = await this.registrationRepository.findAll(userId);
    return registrations;
  }

  async findOne(id: string, tokenPayload: TokenPayloadDto) {
    const registration = await this.registrationRepository.findById(id);
    if (!registration) {
      throw new NotFoundException("Inscrição não encontrada");
    }

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registration.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    return registration;
  }

  async update(
    id: string,
    updateRegistrationDto: UpdateRegistrationDto,
    tokenPayload: TokenPayloadDto
  ) {
    const registrationExists = await this.registrationRepository.findById(id);
    if (!registrationExists)
      throw new NotFoundException("Inscrição não encontrada");

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registrationExists.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const updatedRegistration = await this.registrationRepository.update(
      id,
      updateRegistrationDto
    );
    return {
      message: "Inscrição atualizada com sucesso",
      registration: updatedRegistration,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const registrationExists = await this.registrationRepository.findById(id);
    if (!registrationExists)
      throw new NotFoundException("Inscrição não encontrada");

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      registrationExists.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    await this.registrationRepository.delete(id);
    return {
      message: "Inscrição cancelada com sucesso",
    };
  }
}
