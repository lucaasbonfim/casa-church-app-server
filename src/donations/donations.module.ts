import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { DonationsRepository } from './donations.repository';
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository],
})
export class DonationsModule {}
