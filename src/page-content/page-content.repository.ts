import { InjectModel } from "@nestjs/sequelize";
import { PageContent } from "src/models";

export class PageContentRepository {
  constructor(
    @InjectModel(PageContent)
    private readonly pageContentModel: typeof PageContent,
  ) {}

  findBySlug(slug: string) {
    return this.pageContentModel.findOne({ where: { slug } });
  }

  create(slug: string, content: Record<string, any>) {
    return this.pageContentModel.create({ slug, content } as any);
  }

  async update(slug: string, content: Record<string, any>) {
    const pageContent = await this.findBySlug(slug);
    return pageContent!.update({ content });
  }
}
