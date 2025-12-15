import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CREATED_COMMENT,
  UPDATED_COMMENT,
  DELETED_COMMENT,
  NOT_FOUND_COMMENT,
} from "./comments.constants";

import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentsRepository } from "./comments.repository";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";
import { PostsRepository } from "src/posts/posts.repository";
import { NOT_FOUND_POST_MESSAGE } from "src/posts/posts.constants";

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    tokenPayload: TokenPayloadDto
  ) {
    const postExists = await this.postsRepository.findById(
      createCommentDto.postId
    );

    if (!postExists) throw new NotFoundException(NOT_FOUND_POST_MESSAGE);

    const comment = await this.commentsRepository.create({
      userId: tokenPayload.id,
      ...createCommentDto,
    });

    return {
      message: CREATED_COMMENT,
      comment,
    };
  }

  async findAll(query: FindCommentsQueryDto) {
    const result = await this.commentsRepository.findAll(query);

    // 🔥 IGUAL AO POST
    const userIds = [...new Set(result.posts.map((c) => c.userId))];

    const users = await this.commentsRepository.findUsersByIds(userIds);

    const usersMap = new Map(users.map((user) => [user.id, user]));

    const commentsWithUser = result.posts.map((comment) => ({
      ...comment.toJSON(),
      user: usersMap.get(comment.userId) || null,
    }));

    return {
      ...result,
      posts: commentsWithUser,
    };
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException(NOT_FOUND_COMMENT);

    return comment;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) throw new NotFoundException(NOT_FOUND_COMMENT);

    if (comment.userId !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    await this.commentsRepository.delete(id);

    return {
      message: DELETED_COMMENT,
    };
  }
}
