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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let PostsRepository = class PostsRepository {
    postModel;
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(data) {
        const createdPost = await this.postModel.create(data);
        return createdPost;
    }
    async findAll(findPostsQuery) {
        const { page, limit, userId, orderBy, orderDirection } = findPostsQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (userId)
            where.userId = userId;
        const { rows, count } = await this.postModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            posts: rows,
        };
    }
    async findById(id) {
        const post = await this.postModel.findByPk(id);
        return post;
    }
    async delete(id) {
        const post = await this.findById(id);
        await post.destroy();
        return;
    }
    async findUsersByIds(userIds) {
        return models_1.User.findAll({
            where: {
                id: userIds,
            },
            attributes: ["id", "name"],
        });
    }
};
exports.PostsRepository = PostsRepository;
exports.PostsRepository = PostsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Post)),
    __metadata("design:paramtypes", [Object])
], PostsRepository);
//# sourceMappingURL=posts.repository.js.map