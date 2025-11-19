import { CreateLikeDto } from "./dto/create-like.dto";
import { LikesRepository } from "./likes.repository";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLikesQueryDto } from "./dto/find-likes-query.dto";
import { PostsRepository } from "src/posts/posts.repository";
export declare class LikesService {
    private readonly likesRepository;
    private readonly postsRepository;
    constructor(likesRepository: LikesRepository, postsRepository: PostsRepository);
    create(createLikeDto: CreateLikeDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        like: import("./entities/like.model").Like;
    }>;
    findAll(findLikesQuery: FindLikesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: import("./entities/like.model").Like[];
    }>;
    findOne(id: string): Promise<import("./entities/like.model").Like>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
