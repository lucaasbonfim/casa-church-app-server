import { InjectModel } from "@nestjs/sequelize";
import { Event } from "src/models";
import { CreateEvent, UpdateEvent } from "./types/event.types";

export class EventsRepository {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event
  ) {}

  async create(data: CreateEvent) {
    const createdEvent = await this.eventModel.create(data);

    return createdEvent;
  }

  async findAll() {
    return await this.eventModel.findAll();
  }

  async findById(id: string) {
    const event = await this.eventModel.findByPk(id);

    return event;
  }

  async update(id: string, data: UpdateEvent) {
    const event = await this.findById(id);

    return await event!.update(data);
  }

  async delete(id: string) {
    const event = await this.findById(id);
    await event!.destroy();

    return;
  }
}
