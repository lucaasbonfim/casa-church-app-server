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
const models_1 = require("../models");
const sequelize_2 = require("sequelize");
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
        if (action) {
            where.action = action;
        }
        else {
            where.action = { [sequelize_2.Op.ne]: "GET" };
        }
        const { rows, count } = await this.userActivityModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        const activities = await this.attachUsers(rows);
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            activities,
        };
    }
    async findById(id) {
        const activity = await this.userActivityModel.findByPk(id);
        if (!activity)
            return activity;
        const [enriched] = await this.attachUsers([activity]);
        return enriched;
    }
    async delete(id) {
        const activity = await this.findById(id);
        if (activity)
            await activity.destroy();
        return;
    }
    async attachUsers(activities) {
        const validUserIds = Array.from(new Set(activities
            .map((activity) => activity.userId)
            .filter((userId) => this.isUuid(userId))));
        if (validUserIds.length === 0) {
            activities.forEach((activity) => activity.setDataValue("user", null));
            return activities;
        }
        const users = await models_1.User.findAll({
            where: { id: { [sequelize_2.Op.in]: validUserIds } },
            attributes: ["id", "name", "email", "role"],
        });
        const usersById = new Map(users.map((user) => [user.id, user]));
        activities.forEach((activity) => {
            const user = activity.userId ? usersById.get(activity.userId) || null : null;
            activity.setDataValue("user", user);
        });
        return activities;
    }
    isUuid(value) {
        if (!value)
            return false;
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    }
};
exports.UserActivityRepository = UserActivityRepository;
exports.UserActivityRepository = UserActivityRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(user_activity_model_1.UserActivity)),
    __metadata("design:paramtypes", [Object])
], UserActivityRepository);
//# sourceMappingURL=user-activity.repository.js.map