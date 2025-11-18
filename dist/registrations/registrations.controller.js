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
exports.RegistrationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const common_2 = require("@nestjs/common");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let RegistrationsController = class RegistrationsController {
    registrationsService;
    constructor(registrationsService) {
        this.registrationsService = registrationsService;
    }
    create(createRegistrationDto, tokenPayload) {
        return this.registrationsService.create(createRegistrationDto, tokenPayload);
    }
    findAll(tokenPayload, findRegistrationsQuery) {
        return this.registrationsService.findAll(tokenPayload, findRegistrationsQuery);
    }
    findOne(id, tokenPayload) {
        return this.registrationsService.findOne(id, tokenPayload);
    }
    update(id, updateRegistrationDto, tokenPayload) {
        return this.registrationsService.update(id, updateRegistrationDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.registrationsService.remove(id, tokenPayload);
    }
};
exports.RegistrationsController = RegistrationsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar novas inscrições" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], RegistrationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Listar todas as inscrições (obs: admins podem listar de todos os usuários)",
    }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, token_payload_param_1.TokenPayloadParam)()),
    __param(1, (0, common_1.Query)())
], RegistrationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Listar detalhes de uma inscrição específica",
    }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], RegistrationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar uma inscrição (ex: status) específica" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], RegistrationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluír(cancelar) uma inscrição específica" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], RegistrationsController.prototype, "remove", null);
exports.RegistrationsController = RegistrationsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_2.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("registrations")
], RegistrationsController);
