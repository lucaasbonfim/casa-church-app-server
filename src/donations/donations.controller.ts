import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @ApiOperation({ summary: "Criar nova doação" })
  @Post()
  create(@Body() createDonationDto: CreateDonationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.create(createDonationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todas doações" })
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @ApiOperation({ summary: "Listar doações por usuário" })
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.findAllByUserId(userId, tokenPayload);
  }

  @ApiOperation({ summary: "Visualizar detalhes de uma doação" })
  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.findOne(id, tokenPayload);
  }

  @ApiOperation({ summary: "Atualizar uma doação" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.update(id, updateDonationDto, tokenPayload);
  }

  @ApiOperation({ summary: "Deletar uma doação" })
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.donationsService.remove(id, tokenPayload);
  }
}
