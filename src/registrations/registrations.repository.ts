import { InjectModel } from "@nestjs/sequelize";
import { Registration } from "src/models";
import {
  CreateRegistration,
  UpdateRegistration,
} from "./types/registration.types";

export class RegistrationsRepotisory {
  constructor(
    @InjectModel(Registration)
    private readonly registrationModel: typeof Registration
  ) {}

  async create(data: CreateRegistration) {
    const createdRegistration = await this.registrationModel.create(data);

    return createdRegistration;
  }

  async findAll(userId?: string) {
    const whereClause = userId ? { userId } : {};

    const registrations = await this.registrationModel.findAll({
      where: whereClause,
    });

    return registrations;
  }

  async findById(id: string) {
    const registration = await this.registrationModel.findByPk(id);

    return registration;
  }

  async findByUserId(userId: string) {
    const registrations = await this.registrationModel.findAll({
      where: {
        userId,
      },
    });

    return registrations;
  }

  async findByUserAndEvent(userId: string, eventId: string) {
    return this.registrationModel.findOne({
      where: { userId, eventId },
    });
  }

  async update(id: string, data: UpdateRegistration) {
    const registration = await this.findById(id);

    return await registration!.update(data);
  }

  async delete(id: string) {
    const registration = await this.findById(id);
    await registration!.destroy();

    return;
  }
}
