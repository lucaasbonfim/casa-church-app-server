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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const likes_constants_1 = require("./likes.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const likes_repository_1 = require("./likes.repository");
const posts_repository_1 = require("../posts/posts.repository");
const posts_constants_1 = require("../posts/posts.constants");
let LikesService = class LikesService {
    likesRepository;
    postsRepository;
    constructor(likesRepository, postsRepository) {
        this.likesRepository = likesRepository;
        this.postsRepository = postsRepository;
    }
    async create(createLikeDto, tokenPayload) {
        const postExists = await this.postsRepository.findById(createLikeDto.postId);
        if (!postExists)
            throw new common_1.NotFoundException(posts_constants_1.NOT_FOUND_POST_MESSAGE);
        const existing = await this.likesRepository.findByUserAndPost(tokenPayload.id, createLikeDto.postId);
        if (existing)
            throw new common_1.ConflictException(likes_constants_1.CREATE_LIKE_CONFLICT_MESSAGE);
        const likeData = {
            userId: tokenPayload.id,
            ...createLikeDto,
        };
        const like = await this.likesRepository.create(likeData);
        return {
            message: likes_constants_1.CREATED_LIKE,
            like,
        };
    }
    async findAll(findLikesQuery) {
        return await this.likesRepository.findAll(findLikesQuery);
    }
    async findOne(id) {
        const like = await this.likesRepository.findById(id);
        if (!like)
            throw new common_1.NotFoundException(likes_constants_1.NOT_FOUND_LIKE);
        return like;
    }
    async remove(id, tokenPayload) {
        const like = await this.likesRepository.findById(id);
        if (!like)
            throw new common_1.NotFoundException(likes_constants_1.NOT_FOUND_LIKE);
        if (like.userId !== tokenPayload.id)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        await this.likesRepository.delete(id);
        return {
            message: likes_constants_1.DELETED_LIKE,
        };
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [likes_repository_1.LikesRepository,
        posts_repository_1.PostsRepository])
], LikesService);
//# sourceMappingURL=likes.service.js.map