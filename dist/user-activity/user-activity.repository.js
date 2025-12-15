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
exports.UserActivityRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const user_activity_model_1 = require("./entities/user-activity.model");
let UserActivityRepository = class UserActivityRepository {
    userActivityModel;
    constructor(userActivityModel) {
        this.userActivityModel = userActivityModel;
    }
    async create(data) {
        const created = await this.userActivityModel.create(data);
        return created;
    }
    async findAll(findQuery) {
        const { page, limit, userId, action } = findQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (userId)
            where.userId = userId;
        if (action)
            where.action = action;
        const { rows, count } = await this.userActivityModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            activities: rows,
        };
    }
    async findById(id) {
        const activity = await this.userActivityModel.findByPk(id);
        return activity;
    }
    async delete(id) {
        const activity = await this.findById(id);
        if (activity)
            await activity.destroy();
        return;
    }
};
exports.UserActivityRepository = UserActivityRepository;
exports.UserActivityRepository = UserActivityRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(user_activity_model_1.UserActivity)),
    __metadata("design:paramtypes", [Object])
], UserActivityRepository);
//# sourceMappingURL=user-activity.repository.js.map