import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLikesQueryDto } from "src/likes/dto/find-likes-query.dto";
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
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
