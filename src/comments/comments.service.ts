import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CREATED_COMMENT, UPDATED_COMMENT, DELETED_COMMENT, NOT_FOUND_COMMENT } from "./comments.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto) {
    const commentData = {
      ...createCommentDto,
    };

    if (createCommentDto.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const comment = await this.commentsRepository.create(commentData);
    return {
      message: CREATED_COMMENT,
      comment,
    };
  }

  async findAll(findCommentsQuery: FindCommentsQueryDto) {
    return await this.commentsRepository.findAll(findCommentsQuery);
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException(NOT_FOUND_COMMENT);

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, tokenPayload: TokenPayloadDto) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException(NOT_FOUND_COMMENT);

    if (comment.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    const updatedComment = await this.commentsRepository.update(id, updateCommentDto);
    return {
      message: UPDATED_COMMENT,
      comment: updatedComment,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException(NOT_FOUND_COMMENT);

    if (comment.userId !== tokenPayload.id)
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);

    await this.commentsRepository.delete(id);
    return {
      message: DELETED_COMMENT,
    };
  }
}
