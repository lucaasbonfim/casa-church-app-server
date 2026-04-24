import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PageContent } from "./entities/page-content.model";
import { PageContentController } from "./page-content.controller";
import { PageContentRepository } from "./page-content.repository";
import { PageContentService } from "./page-content.service";
import { AuthModule } from "../auth/auth.module";
import { UserActivityModule } from "src/user-activity/user-activity.module";

@Module({
  imports: [
    SequelizeModule.forFeature([PageContent]),
    AuthModule,
    UserActivityModule,
  ],
  controllers: [PageContentController],
  providers: [PageContentService, PageContentRepository],
})
export class PageContentModule {}
