import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { ApiOperation, ApiSecurity } from "@nestjs/swagger";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";

@ApiSecurity("auth-token")
@UseGuards(AuthTokenGuard)
@Controller('comments')
export class CommentsController {
constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Criar novo comentário" })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.commentsService.create(createCommentDto, tokenPayload);
  }

  @ApiOperation({ summary: "Listar todos comentários" })
  @Get()
  findAll(@Query() findCommentsQuery: FindCommentsQueryDto) {
    return this.commentsService.findAll(findCommentsQuery);
  }

  @ApiOperation({ summary: "Visualizar detalhes de um comentário" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({ summary: "Atualizar um comentário" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.commentsService.update(id, updateCommentDto, tokenPayload);
  }

  @ApiOperation({ summary: "Deletar um comentário" })
  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.commentsService.remove(id, tokenPayload);
  }
}
