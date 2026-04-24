import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { ChurchHouse } from "src/models";
import { FindChurchHousesQueryDto } from "./dto/find-church-houses-query.dto";
import { CreateChurchHouse, UpdateChurchHouse } from "./types/church-house.types";

export class ChurchHousesRepository {
  constructor(
    @InjectModel(ChurchHouse)
    private readonly churchHouseModel: typeof ChurchHouse
  ) {}

  async create(data: CreateChurchHouse) {
    return this.churchHouseModel.create(data as any);
  }

  async findAll(findQuery: FindChurchHousesQueryDto) {
    const { page, limit, name, city, uf, active, orderBy, orderDirection } =
      findQuery;
    const offset = (page - 1) * limit;

    const where: any = {};

    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (uf) where.uf = { [Op.iLike]: uf };
    if (active !== undefined) where.active = active;

    const { rows, count } = await this.churchHouseModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      churchHouses: rows,
    };
  }

  async findById(id: string) {
    return this.churchHouseModel.findByPk(id);
  }

  async update(id: string, data: UpdateChurchHouse) {
    const churchHouse = await this.findById(id);
    return churchHouse!.update(data);
  }

  async delete(id: string) {
    const churchHouse = await this.findById(id);
    await churchHouse!.destroy();
  }
}
