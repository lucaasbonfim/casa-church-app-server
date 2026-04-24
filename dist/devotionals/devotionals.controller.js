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
exports.DevotionalsController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const swagger_1 = require("@nestjs/swagger");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
const create_devotional_dto_1 = require("./dto/create-devotional.dto");
const find_devotionals_query_dto_1 = require("./dto/find-devotionals-query.dto");
const update_devotional_dto_1 = require("./dto/update-devotional.dto");
const devotionals_service_1 = require("./devotionals.service");
let DevotionalsController = class DevotionalsController {
    devotionalsService;
    constructor(devotionalsService) {
        this.devotionalsService = devotionalsService;
    }
    create(createDevotionalDto, tokenPayload) {
        return this.devotionalsService.create(createDevotionalDto, tokenPayload);
    }
    findAll(findQuery) {
        return this.devotionalsService.findAll(findQuery);
    }
    findOne(id) {
        return this.devotionalsService.findOne(id);
    }
    update(id, updateDevotionalDto, tokenPayload) {
        return this.devotionalsService.update(id, updateDevotionalDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.devotionalsService.remove(id, tokenPayload);
    }
};
exports.DevotionalsController = DevotionalsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Cadastrar devocional" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_devotional_dto_1.CreateDevotionalDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], DevotionalsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar devocionais" }),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_devotionals_query_dto_1.FindDevotionalsQueryDto]),
    __metadata("design:returntype", void 0)
], DevotionalsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Buscar devocional por id" }),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevotionalsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar devocional" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_devotional_dto_1.UpdateDevotionalDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], DevotionalsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Remover devocional" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], DevotionalsController.prototype, "remove", null);
exports.DevotionalsController = DevotionalsController = __decorate([
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("devotionals"),
    __metadata("design:paramtypes", [devotionals_service_1.DevotionalsService])
], DevotionalsController);
//# sourceMappingURL=devotionals.controller.js.map