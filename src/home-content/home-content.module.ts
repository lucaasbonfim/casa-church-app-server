import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";
import { HomeContentController } from "./home-content.controller";
import { HomeContentRepository } from "./home-content.repository";
import { HomeContentService } from "./home-content.service";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [HomeContentController],
  providers: [HomeContentService, HomeContentRepository],
})
export class HomeContentModule {}
