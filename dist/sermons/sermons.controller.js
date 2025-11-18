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
exports.SermonsController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const common_2 = require("@nestjs/common");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let SermonsController = class SermonsController {
    sermonsService;
    constructor(sermonsService) {
        this.sermonsService = sermonsService;
    }
    create(createSermonDto, tokenPayload) {
        return this.sermonsService.create(createSermonDto, tokenPayload);
    }
    findAll(findSermonQueryDto) {
        return this.sermonsService.findAll(findSermonQueryDto);
    }
    findOne(id) {
        return this.sermonsService.findOne(id);
    }
    update(id, updateSermonDto, tokenPayload) {
        return this.sermonsService.update(id, updateSermonDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.sermonsService.remove(id, tokenPayload);
    }
};
exports.SermonsController = SermonsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar novos sermões" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], SermonsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todos os sermões" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)())
], SermonsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar detalhes de um sermão específico" }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id"))
], SermonsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar um sermão específico" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], SermonsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir um sermão específico" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], SermonsController.prototype, "remove", null);
exports.SermonsController = SermonsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_2.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("sermons")
], SermonsController);
