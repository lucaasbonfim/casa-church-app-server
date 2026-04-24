import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Devotional } from "src/models";
import { FindDevotionalsQueryDto } from "./dto/find-devotionals-query.dto";
import { CreateDevotional, UpdateDevotional } from "./types/devotional.types";

function normalizeQueryDate(date: Date) {
  if (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  ) {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );
  }

  return new Date(date);
}

function getDayRange(date: Date) {
  const normalizedDate = normalizeQueryDate(date);
  const start = new Date(normalizedDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(normalizedDate);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}

export class DevotionalsRepository {
  constructor(
    @InjectModel(Devotional)
    private readonly devotionalModel: typeof Devotional,
  ) {}

  async create(data: CreateDevotional) {
    return this.devotionalModel.create(data as any);
  }

  async findAll(findQuery: FindDevotionalsQueryDto) {
    const {
      page,
      limit,
      title,
      date,
      devotionalDate,
      startDate,
      endDate,
      published,
      orderBy,
      orderDirection,
    } = findQuery;
    const offset = (page - 1) * limit;

    const where: any = {};

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (published !== undefined) where.published = published;

    const exactDate = devotionalDate || date;
    if (exactDate) {
      where.devotionalDate = { [Op.between]: getDayRange(exactDate) };
    } else if (startDate && endDate) {
      const [start] = getDayRange(startDate);
      const [, end] = getDayRange(endDate);
      where.devotionalDate = { [Op.between]: [start, end] };
    } else if (startDate) {
      const [start] = getDayRange(startDate);
      where.devotionalDate = { [Op.gte]: start };
    } else if (endDate) {
      const [, end] = getDayRange(endDate);
      where.devotionalDate = { [Op.lte]: end };
    }

    const { rows, count } = await this.devotionalModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      devotionals: rows,
    };
  }

  async findById(id: string) {
    return this.devotionalModel.findByPk(id);
  }

  async update(id: string, data: UpdateDevotional) {
    const devotional = await this.findById(id);
    return devotional!.update(data);
  }

  async delete(id: string) {
    const devotional = await this.findById(id);
    await devotional!.destroy();
  }
}
