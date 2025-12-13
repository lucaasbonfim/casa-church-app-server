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
exports.LessonProgressController = void 0;
const common_1 = require("@nestjs/common");
const lesson_progress_service_1 = require("./lesson-progress.service");
const create_lesson_progress_dto_1 = require("./dto/create-lesson-progress.dto");
const update_lesson_progress_dto_1 = require("./dto/update-lesson-progress.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const find_lesson_progress_query_dto_1 = require("./dto/find-lesson-progress-query.dto");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let LessonProgressController = class LessonProgressController {
    lessonProgressService;
    constructor(lessonProgressService) {
        this.lessonProgressService = lessonProgressService;
    }
    create(createLessonProgressDto, tokenPayLoad) {
        return this.lessonProgressService.create(createLessonProgressDto, tokenPayLoad);
    }
    findAll(tokenPayLoad, findLessonProgressDto) {
        return this.lessonProgressService.findAll(tokenPayLoad, findLessonProgressDto);
    }
    update(lessonId, updateLessonProgressDto, tokenPayLoad) {
        console.log(lessonId);
        return this.lessonProgressService.update(lessonId, updateLessonProgressDto, tokenPayLoad);
    }
    remove(lessonId, tokenPayLoad) {
        return this.lessonProgressService.remove(lessonId, tokenPayLoad);
    }
};
exports.LessonProgressController = LessonProgressController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar novos progressos de aula." }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_progress_dto_1.CreateLessonProgressDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], LessonProgressController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar os progressos de aula." }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, token_payload_param_1.TokenPayloadParam)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_payload_dto_1.TokenPayloadDto,
        find_lesson_progress_query_dto_1.FindLessonProgressDto]),
    __metadata("design:returntype", void 0)
], LessonProgressController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar os progressos de aula." }),
    (0, common_1.Patch)(":lessonId"),
    __param(0, (0, common_1.Param)("lessonId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lesson_progress_dto_1.UpdateLessonProgressDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], LessonProgressController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Remover os progressos de aula." }),
    (0, common_1.Delete)(":lessonId"),
    __param(0, (0, common_1.Param)("lessonId")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], LessonProgressController.prototype, "remove", null);
exports.LessonProgressController = LessonProgressController = __decorate([
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("lesson-progress"),
    __metadata("design:paramtypes", [lesson_progress_service_1.LessonProgressService])
], LessonProgressController);
//# sourceMappingURL=lesson-progress.controller.js.map