import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { CoursesRepository } from "./courses.repository";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
