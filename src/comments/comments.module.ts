import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
