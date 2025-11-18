"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const user_constants_1 = require("../users/user.constants");
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
    async findAll(findPostsQuery) {
        const posts = await this.postsRepository.findAll(findPostsQuery);
        return posts;
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
    (0, common_1.Injectable)()
], PostsService);
