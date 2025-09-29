import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";

@UseGuards(AuthTokenGuard)
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.postsService.create(createPostDto, tokenPayload);
  }

  @Get()
  findAll(@Query() findPostsQuery: FindPostsQueryDto) {
    return this.postsService.findAll(findPostsQuery);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.postsService.remove(id, tokenPayload);
  }
}
