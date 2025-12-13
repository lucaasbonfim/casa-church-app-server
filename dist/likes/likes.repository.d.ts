import { Like } from "src/models";
import { CreateLike } from "./types/like.types";
import { FindLikesQueryDto } from "./dto/find-likes-query.dto";
export declare class LikesRepository {
    private readonly likeModel;
    constructor(likeModel: typeof Like);
    create(data: CreateLike): Promise<Like>;
    findByUserAndPost(userId: string, postId: string): Promise<Like | null>;
    findAll(findLikesQuery: FindLikesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: Like[];
    }>;
    findById(id: string): Promise<Like | null>;
    delete(id: string): Promise<void>;
}
