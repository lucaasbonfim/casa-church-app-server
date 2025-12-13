import { Post, User } from "src/models";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";
export declare class PostsRepository {
    private readonly postModel;
    constructor(postModel: typeof Post);
    create(data: any): Promise<Post>;
    findAll(findPostsQuery: FindPostsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        posts: Post[];
    }>;
    findById(id: string): Promise<Post | null>;
    delete(id: string): Promise<void>;
    findUsersByIds(userIds: string[]): Promise<User[]>;
}
