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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comments_constants_1 = require("./comments.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const comments_repository_1 = require("./comments.repository");
const posts_repository_1 = require("../posts/posts.repository");
const posts_constants_1 = require("../posts/posts.constants");
let CommentsService = class CommentsService {
    commentsRepository;
    postsRepository;
    constructor(commentsRepository, postsRepository) {
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
    }
    async create(createCommentDto, tokenPayload) {
        const postExists = await this.postsRepository.findById(createCommentDto.postId);
        if (!postExists)
            throw new common_1.NotFoundException(posts_constants_1.NOT_FOUND_POST_MESSAGE);
        const comment = await this.commentsRepository.create({
            userId: tokenPayload.id,
            ...createCommentDto,
        });
        return {
            message: comments_constants_1.CREATED_COMMENT,
            comment,
        };
    }
    async findAll(query) {
        const result = await this.commentsRepository.findAll(query);
        const userIds = [...new Set(result.posts.map((c) => c.userId))];
        const users = await this.commentsRepository.findUsersByIds(userIds);
        const usersMap = new Map(users.map((user) => [user.id, user]));
        const commentsWithUser = result.posts.map((comment) => ({
            ...comment.toJSON(),
            user: usersMap.get(comment.userId) || null,
        }));
        return {
            ...result,
            posts: commentsWithUser,
        };
    }
    async findOne(id) {
        const comment = await this.commentsRepository.findById(id);
        if (!comment)
            throw new common_1.NotFoundException(comments_constants_1.NOT_FOUND_COMMENT);
        return comment;
    }
    async remove(id, tokenPayload) {
        const comment = await this.commentsRepository.findById(id);
        if (!comment)
            throw new common_1.NotFoundException(comments_constants_1.NOT_FOUND_COMMENT);
        if (comment.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.commentsRepository.delete(id);
        return {
            message: comments_constants_1.DELETED_COMMENT,
        };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        posts_repository_1.PostsRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map