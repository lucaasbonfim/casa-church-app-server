import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { ContactMessagesService } from "./contact-messages.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { CacheInterceptor } from "@nestjs/cache-manager";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@Controller("contact-messages")
export class ContactMessagesController {
  constructor(
    private readonly contactMessagesService: ContactMessagesService
  ) {}

  @ApiOperation({ summary: "Criar novas mensagens no fórum de discussão" })
  @Post()
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactMessagesService.create(createContactMessageDto);
  }

  @ApiOperation({ summary: "Listar todas as mensagens do fórum de discussão" })
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.contactMessagesService.findAll();
  }

  @ApiOperation({
    summary: "Listar detalhes de uma mensagem do fórum de discussão",
  })
  @Get(":id")
  @UseInterceptors(CacheInterceptor)
  findOne(@Param("id") id: string) {
    return this.contactMessagesService.findOne(id);
  }

  @ApiOperation({
    summary: "Atualizar uma mensagem específica do fórum de discussão",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateContactMessageDto: UpdateContactMessageDto
  ) {
    return this.contactMessagesService.update(id, updateContactMessageDto);
  }

  @ApiOperation({
    summary: "Excluir uma mensagem específica do fórum de discussão",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contactMessagesService.remove(id);
  }
}
