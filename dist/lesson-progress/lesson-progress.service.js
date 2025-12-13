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
exports.LessonProgressService = void 0;
const common_1 = require("@nestjs/common");
const lesson_progress_repository_1 = require("./lesson-progress.repository");
const messages_constants_1 = require("../common/constants/messages.constants");
const lesson_progress_constants_1 = require("./lesson-progress.constants");
let LessonProgressService = class LessonProgressService {
    lessonProgressRepository;
    constructor(lessonProgressRepository) {
        this.lessonProgressRepository = lessonProgressRepository;
    }
    async create(createLessonProgressDto, tokenPayload) {
        const { userId, lessonId } = createLessonProgressDto;
        if (tokenPayload.id !== userId) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const existing = await this.lessonProgressRepository.findByLessonAndUser(lessonId, userId);
        if (existing)
            throw new common_1.ConflictException(lesson_progress_constants_1.CREATE_PROGRESS_LESSON_CONFLICT_MESSAGE);
        const createdProgress = await this.lessonProgressRepository.create({
            userId,
            lessonId,
        });
        return {
            message: lesson_progress_constants_1.CREATED_PROGRESS_LESSON_MESSAGE,
            progress: createdProgress,
        };
    }
    async findAll(tokenPayload, findLessonProgressDto) {
        return await this.lessonProgressRepository.findAll(tokenPayload, findLessonProgressDto);
    }
    async update(lessonId, updateLessonProgressDto, tokenPayload) {
        const userId = tokenPayload.id;
        const lessonProgress = await this.lessonProgressRepository.findByLessonAndUser(lessonId, userId);
        if (!lessonProgress) {
            throw new common_1.NotFoundException(lesson_progress_constants_1.NOT_FOUND_PROGRESS_LESSON);
        }
        const updatedProgress = await this.lessonProgressRepository.update(lessonProgress.id, updateLessonProgressDto);
        return {
            message: lesson_progress_constants_1.UPDATED_PROGRESS_LESSON_MESSAGE,
            progress: updatedProgress,
        };
    }
    async remove(lessonId, tokenPayload) {
        const userId = tokenPayload.id;
        const lessonProgress = await this.lessonProgressRepository.findByLessonAndUser(lessonId, userId);
        if (!lessonProgress) {
            throw new common_1.NotFoundException(lesson_progress_constants_1.NOT_FOUND_PROGRESS_LESSON);
        }
        await this.lessonProgressRepository.delete(lessonProgress.id);
        return { message: lesson_progress_constants_1.DELETED_PROGRESS_LESSON_MESSAGE };
    }
};
exports.LessonProgressService = LessonProgressService;
exports.LessonProgressService = LessonProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lesson_progress_repository_1.LessonProgressRepository])
], LessonProgressService);
//# sourceMappingURL=lesson-progress.service.js.map