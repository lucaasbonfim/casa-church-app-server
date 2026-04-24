import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";
import { DevotionalsController } from "./devotionals.controller";
import { DevotionalsRepository } from "./devotionals.repository";
import { DevotionalsService } from "./devotionals.service";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [DevotionalsController],
  providers: [DevotionalsService, DevotionalsRepository],
})
export class DevotionalsModule {}
