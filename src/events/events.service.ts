import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { EventsRepository } from "./events.repository";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async create(createEventDto: CreateEventDto, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const eventData = {
      ...createEventDto,
      createdBy: tokenPayload.id,
    };

    const event = await this.eventsRepository.create(eventData);
    return {
      message: "Evento cadastrado com sucesso",
      event,
    };
  }

  async findAll(findEventsQuery: FindEventsQueryDto) {
    return await this.eventsRepository.findAll(findEventsQuery);
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findById(id);
    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException("Evento não encontrado");

    const updatedEvent = await this.eventsRepository.update(id, updateEventDto);
    return {
      message: "Evento atualizado com sucesso",
      event: updatedEvent,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException("Evento não encontrado");

    await this.eventsRepository.delete(id);
    return {
      message: "Evento deletado com sucesso",
    };
  }
}
