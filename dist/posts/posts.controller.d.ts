import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        post: import("./entities/post.model").Post;
    }>;
    findAll(findPostsQuery: FindPostsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        posts: import("./entities/post.model").Post[];
    }>;
    findOne(id: string): Promise<import("./entities/post.model").Post>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
