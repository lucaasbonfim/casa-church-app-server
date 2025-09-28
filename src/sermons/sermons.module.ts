import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SermonsService } from "./sermons.service";
import { SermonsController } from "./sermons.controller";
import { SermonsRepository } from "./sermons.repository";
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [SermonsController],
  providers: [SermonsService, SermonsRepository],
})
export class SermonsModule {}
