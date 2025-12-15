import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        comment: import("./entities/comment.model").Comment;
    }>;
    findAll(findCommentsQuery: FindCommentsQueryDto): Promise<{
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
