import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";
import { UserActivityModule } from "src/user-activity/user-activity.module";
import { ChurchHousesController } from "./church-houses.controller";
import { ChurchHousesRepository } from "./church-houses.repository";
import { ChurchHousesService } from "./church-houses.service";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule, UserActivityModule],
  controllers: [ChurchHousesController],
  providers: [ChurchHousesService, ChurchHousesRepository],
})
export class ChurchHousesModule {}
