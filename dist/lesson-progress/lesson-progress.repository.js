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
exports.LessonProgressRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
const common_1 = require("@nestjs/common");
let LessonProgressRepository = class LessonProgressRepository {
    lessonProgressModel;
    constructor(lessonProgressModel) {
        this.lessonProgressModel = lessonProgressModel;
    }
    async create(data) {
        return await this.lessonProgressModel.create(data);
    }
    async findAll(tokenPayload, findLessonProgressDto) {
        const { page, limit, orderBy, orderDirection, lessonId } = findLessonProgressDto;
        const offset = (page - 1) * limit;
        const userId = tokenPayload.id;
        const where = { userId };
        if (lessonId)
            where.lessonId = lessonId;
        const { rows, count } = await this.lessonProgressModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            lessons: rows,
        };
    }
    async findById(id) {
        return await this.lessonProgressModel.findByPk(id);
    }
    async findByLessonAndUser(lessonId, userId) {
        return await this.lessonProgressModel.findOne({
            where: { lessonId, userId },
        });
    }
    async update(id, data) {
        const lesson = await this.findById(id);
        if (!lesson)
            return null;
        return await lesson.update(data);
    }
    async delete(id) {
        const lesson = await this.findById(id);
        if (!lesson)
            return null;
        await lesson.destroy();
    }
};
exports.LessonProgressRepository = LessonProgressRepository;
exports.LessonProgressRepository = LessonProgressRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.LessonProgress)),
    __metadata("design:paramtypes", [Object])
], LessonProgressRepository);
//# sourceMappingURL=lesson-progress.repository.js.map