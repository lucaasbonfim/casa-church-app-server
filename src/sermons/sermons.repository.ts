import { InjectModel } from "@nestjs/sequelize";
import { Sermon } from "src/models";

export class SermonsRepository {
  constructor(
    @InjectModel(Sermon)
    private readonly sermonModel: typeof Sermon
  ) {}

  async create(data) {
    const createdSermon = await this.sermonModel.create(data);

    return createdSermon;
  }

  async findAll() {
    const sermons = await this.sermonModel.findAll();

    return sermons;
  }

  async findById(id: string) {
    const sermon = await this.sermonModel.findByPk(id);

    return sermon;
  }

  async update(id: string, data) {
    const sermon = await this.findById(id);

    return await sermon!.update(data);
  }

  async delete(id: string) {
    const sermon = await this.findById(id);
    await sermon!.destroy();

    return;
  }
}
