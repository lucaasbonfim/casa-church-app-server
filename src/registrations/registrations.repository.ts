import { InjectModel } from "@nestjs/sequelize";
import { Registration } from "src/models";
import {
  CreateRegistration,
  UpdateRegistration,
} from "./types/registration.types";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";

export class RegistrationsRepotisory {
  constructor(
    @InjectModel(Registration)
    private readonly registrationModel: typeof Registration
  ) {}

  async create(data) {
    const createdRegistration = await this.registrationModel.create(data);

    return createdRegistration;
  }

  async findAll(findRegistrationsQuery: FindRegistrationsQueryDto) {
    console.log(findRegistrationsQuery);
    const { page, limit, userId, eventId, orderBy, orderDirection } =
      findRegistrationsQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (eventId) where.eventId = eventId;

    const { rows, count } = await this.registrationModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      registrations: rows,
    };
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
