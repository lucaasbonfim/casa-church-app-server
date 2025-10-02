import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { ContactMessagesRepository } from './contact-messages.repository';

@Injectable()
export class ContactMessagesService {
  constructor(private readonly contactMessagesRepository: ContactMessagesRepository) {}

  async create(createContactMessageDto: CreateContactMessageDto) {
    const contactMessageData = {
      ...createContactMessageDto,
    };

    const contactMessage = await this.contactMessagesRepository.create(contactMessageData);
    return {
      message: 'Mensagem cadastrada com sucesso no fórum de discussão',
      contactMessage,
    };
  }

  async findAll() {
    return await this.contactMessagesRepository.findAll();
  }

  async findOne(id: string) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    return contactMessage;
  }

  async update(id: string, updateContactMessageDto: UpdateContactMessageDto) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    if (!contactMessage) throw new NotFoundException('Mensagem não encontrada no fórum de discussão');

    const updatedContactMessage = await this.contactMessagesRepository.update(id, updateContactMessageDto);
    return {
      message: 'Mensagem atualizada com sucesso no fórum de discussão',
      contactMessage: updatedContactMessage,
    };
  }

  async remove(id: string) {
    const contactMessage = await this.contactMessagesRepository.findById(id);
    if (!contactMessage) throw new NotFoundException('Mensagem não encontrada no fórum de discussão');

    await this.contactMessagesRepository.delete(id);
    return {
      message: 'Mensagem deletada com sucesso',
    }
  }
}
