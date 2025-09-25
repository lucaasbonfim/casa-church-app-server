import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { EventsRepository } from "./events.repository";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
})
export class EventsModule {}
