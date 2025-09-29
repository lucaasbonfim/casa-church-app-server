import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { PostsRepository } from "./posts.repository";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto, tokenPayload: TokenPayloadDto) {
    if (createPostDto.userId !== tokenPayload.id)
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso"
      );

    const createdPost = await this.postsRepository.create(createPostDto);
    return {
      message: "Postagem criada com sucesso",
      post: createdPost,
    };
  }

  async findAll(findPostsQuery: FindPostsQueryDto) {
    const posts = await this.postsRepository.findAll(findPostsQuery);

    return posts;
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findById(id);
    if (!post) throw new NotFoundException("Postagem não encontrada");

    return post;
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const post = await this.postsRepository.findById(id);
    if (!post) throw new NotFoundException("Postagem não encontrada");

    if (
      tokenPayload.role !== USER_ADMIN_ROLE &&
      post.userId !== tokenPayload.id
    ) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso"
      );
    }

    await this.postsRepository.delete(id);
    return {
      message: "Postagem excluída com sucesso",
    };
  }
}
