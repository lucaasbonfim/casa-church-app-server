import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentsRepository } from "./comments.repository";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";
import { PostsRepository } from "src/posts/posts.repository";
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly postsRepository;
    constructor(commentsRepository: CommentsRepository, postsRepository: PostsRepository);
    create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        comment: import("./entities/comment.model").Comment;
    }>;
    findAll(query: FindCommentsQueryDto): Promise<{
        posts: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/comment.model").Comment>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
