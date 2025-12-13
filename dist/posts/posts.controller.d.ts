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
        posts: {
            user: import("../models").User | null;
            id: string;
            userId: string;
            content: string;
            createdAt: Date;
            updatedAt?: Date | any;
            deletedAt?: Date | any;
            version?: number | any;
            _attributes: import("./entities/post.model").Post;
            dataValues: import("./entities/post.model").Post;
            _creationAttributes: import("./entities/post.model").Post;
            isNewRecord: boolean;
            sequelize: import("sequelize").Sequelize;
            _model: import("sequelize").Model<import("./entities/post.model").Post, import("./entities/post.model").Post>;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/post.model").Post>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
