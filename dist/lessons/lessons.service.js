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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const lessons_repository_1 = require("./lessons.repository");
const user_constants_1 = require("../users/user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const lessons_constants_1 = require("./lessons.constants");
let LessonsService = class LessonsService {
    LessonRepository;
    constructor(LessonRepository) {
        this.LessonRepository = LessonRepository;
    }
    async create(createLessonDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const createdLesson = await this.LessonRepository.create(createLessonDto);
        return {
            message: lessons_constants_1.CREATED_LESSON_MESSAGE,
            sermon: createdLesson,
        };
    }
    async findAll(query) {
        const lessons = await this.LessonRepository.findAll(query);
        return lessons;
    }
    async findOne(id) {
        const lesson = await this.LessonRepository.findById(id);
        if (!lesson) {
            throw new common_1.NotFoundException(lessons_constants_1.NOT_FOUND_LESSON);
        }
        return lesson;
    }
    async update(id, updateLessonDto, tokenPayload) {
        const LessonExists = this.LessonRepository.findById(id);
        if (!LessonExists) {
            throw new common_1.NotFoundException(lessons_constants_1.NOT_FOUND_LESSON);
        }
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const updatedLesson = await this.LessonRepository.update(id, updateLessonDto);
        return {
            message: lessons_constants_1.UPDATED_LESSON_MESSAGE,
            lesson: updatedLesson,
        };
    }
    async remove(id, tokenPayload) {
        const lessonExists = this.LessonRepository.findById(id);
        if (!lessonExists) {
            throw new common_1.NotFoundException(lessons_constants_1.NOT_FOUND_LESSON);
        }
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.LessonRepository.delete(id);
        return {
            message: lessons_constants_1.DELETED_LESSON_MESSAGE,
        };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lessons_repository_1.LessonsRepository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map