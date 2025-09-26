import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RegistrationsService } from "./registrations.service";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsRepotisory } from "./registrations.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepotisory],
})
export class RegistrationsModule {}
