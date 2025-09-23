import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
