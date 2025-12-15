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
exports.UserActivityController = void 0;
const common_1 = require("@nestjs/common");
const user_activity_service_1 = require("./user-activity.service");
const create_user_activity_dto_1 = require("./dto/create-user-activity.dto");
const find_user_activity_query_dto_1 = require("./dto/find-user-activity-query.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const common_2 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let UserActivityController = class UserActivityController {
    userActivityService;
    constructor(userActivityService) {
        this.userActivityService = userActivityService;
    }
    create(createDto) {
        return this.userActivityService.create(createDto);
    }
    findAll(query) {
        return this.userActivityService.findAll(query);
    }
    findOne(id) {
        return this.userActivityService.findOne(id);
    }
    remove(id) {
        return this.userActivityService.remove(id);
    }
};
exports.UserActivityController = UserActivityController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Registrar uma nova atividade de usuário" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_activity_dto_1.CreateUserActivityDto]),
    __metadata("design:returntype", void 0)
], UserActivityController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todas as atividades registradas" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_user_activity_query_dto_1.FindUserActivityQueryDto]),
    __metadata("design:returntype", void 0)
], UserActivityController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar detalhes de uma atividade específica" }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserActivityController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir um registro de atividade" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserActivityController.prototype, "remove", null);
exports.UserActivityController = UserActivityController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_2.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("user-activity"),
    __metadata("design:paramtypes", [user_activity_service_1.UserActivityService])
], UserActivityController);
//# sourceMappingURL=user-activity.controller.js.map