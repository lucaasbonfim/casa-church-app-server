import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { EventsRepository } from "./events.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsRepository],
})
export class EventsModule {}
