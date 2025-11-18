"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const common_2 = require("@nestjs/common");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let LessonsController = class LessonsController {
    lessonsService;
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    create(createLessonDto, tokenPayload) {
        return this.lessonsService.create(createLessonDto, tokenPayload);
    }
    findAll(findLessonQueryDto) {
        return this.lessonsService.findAll(findLessonQueryDto);
    }
    findOne(id) {
        return this.lessonsService.findOne(id);
    }
    update(id, updateLessonDto, tokenPayload) {
        return this.lessonsService.update(id, updateLessonDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.lessonsService.remove(id, tokenPayload);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Cadastrar novas aulas" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], LessonsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todas as aulas" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)())
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar detalhes de uma aula específica" }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id"))
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar uma aula específica" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], LessonsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir uma aula específica" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], LessonsController.prototype, "remove", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_2.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("lessons")
], LessonsController);
