import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { StudentsRepository } from "./students.repository";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
