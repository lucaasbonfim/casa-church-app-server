import { InjectModel } from "@nestjs/sequelize";
import { HomeContent } from "src/models";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";

export class HomeContentRepository {
  constructor(
    @InjectModel(HomeContent)
    private readonly homeContentModel: typeof HomeContent
  ) {}

  async findCurrent() {
    return this.homeContentModel.findOne({
      order: [["createdAt", "ASC"]],
    });
  }

  async create(data: Partial<HomeContent>) {
    return this.homeContentModel.create(data as any);
  }

  async update(id: string, data: UpdateHomeContentDto) {
    const homeContent = await this.homeContentModel.findByPk(id);
    return homeContent!.update(data);
  }
}
