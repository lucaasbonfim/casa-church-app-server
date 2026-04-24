"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const user_constants_1 = require("../users/user.constants");
const posts_repository_1 = require("./posts.repository");
const messages_constants_1 = require("../common/constants/messages.constants");
const posts_constants_1 = require("./posts.constants");
let PostsService = class PostsService {
    postsRepository;
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async create(createPostDto, tokenPayload) {
        if (createPostDto.userId !== tokenPayload.id)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        const createdPost = await this.postsRepository.create(createPostDto);
        return {
            message: posts_constants_1.CREATED_POST_MESSAGE,
            post: createdPost,
        };
    }
    async findAll(findPostsQuery, tokenPayload) {
        const result = await this.postsRepository.findAll(findPostsQuery);
        const postIds = result.posts.map((post) => post.id);
        if (!postIds.length) {
            return {
                ...result,
                posts: [],
            };
        }
        const userIds = [...new Set(result.posts.map((post) => post.userId))];
        const [users, commentsCountRows, likesCountRows, currentUserLikes] = await Promise.all([
            this.postsRepository.findUsersByIds(userIds),
            this.postsRepository.countCommentsByPostIds(postIds),
            this.postsRepository.countLikesByPostIds(postIds),
            tokenPayload?.id
                ? this.postsRepository.findCurrentUserLikesByPostIds(tokenPayload.id, postIds)
                : Promise.resolve([]),
        ]);
        const usersMap = new Map(users.map((user) => [user.id, user]));
        const commentsCountMap = new Map(commentsCountRows.map((item) => [item.postId, Number(item.count)]));
        const likesCountMap = new Map(likesCountRows.map((item) => [item.postId, Number(item.count)]));
        const currentUserLikesMap = new Map(currentUserLikes.map((like) => [like.postId, like.id]));
        const postsWithUser = result.posts.map((post) => ({
            ...post.toJSON(),
            user: usersMap.get(post.userId) || null,
            social: {
                likesCount: likesCountMap.get(post.id) || 0,
                commentsCount: commentsCountMap.get(post.id) || 0,
                currentUserLikeId: currentUserLikesMap.get(post.id) || null,
                isLikedByCurrentUser: currentUserLikesMap.has(post.id),
            },
        }));
        return {
            ...result,
            posts: postsWithUser,
        };
    }
    async findOne(id) {
        const post = await this.postsRepository.findById(id);
        if (!post)
            throw new common_1.NotFoundException(posts_constants_1.NOT_FOUND_POST_MESSAGE);
        return post;
    }
    async remove(id, tokenPayload) {
        const post = await this.postsRepository.findById(id);
        if (!post)
            throw new common_1.NotFoundException(posts_constants_1.NOT_FOUND_POST_MESSAGE);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            post.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.postsRepository.delete(id);
        return {
            message: posts_constants_1.DELETED_POST_MESSAGE,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository])
], PostsService);
//# sourceMappingURL=posts.service.js.map