import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";

@UseGuards(AuthTokenGuard)
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private readonly contactMessagesService: ContactMessagesService) {}

  @Post()
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessagesService.create(createContactMessageDto);
  }

  @Get()
  findAll() {
    return this.contactMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactMessagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactMessageDto: UpdateContactMessageDto) {
    return this.contactMessagesService.update(id, updateContactMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactMessagesService.remove(id);
  }
}
