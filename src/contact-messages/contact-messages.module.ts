import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ContactMessagesService } from './contact-messages.service';
import { ContactMessagesController } from './contact-messages.controller';
import { ContactMessagesRepository } from './contact-messages.repository';
import { AuthModule } from "src/auth/auth.module";
import { models } from "src/models";

@Module({
  imports: [SequelizeModule.forFeature(models), AuthModule],
  controllers: [ContactMessagesController],
  providers: [ContactMessagesService, ContactMessagesRepository],
})
export class ContactMessagesModule {}
