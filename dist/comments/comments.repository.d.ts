import { Comment, User } from "src/models";
import { CreateComment } from "./types/comment.types";
import { FindCommentsQueryDto } from "./dto/find-comments-query.dto";
export declare class CommentsRepository {
    private readonly commentModel;
    constructor(commentModel: typeof Comment);
    create(data: CreateComment): Promise<Comment>;
    findAll(findCommentsQuery: FindCommentsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        posts: Comment[];
    }>;
    findById(id: string): Promise<Comment | null>;
    delete(id: string): Promise<void>;
    findUsersByIds(userIds: string[]): Promise<User[]>;
}
