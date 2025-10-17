import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationsRepository } from './locations.repository';
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
