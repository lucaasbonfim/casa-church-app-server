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
exports.RegistrationsController = void 0;
const common_1 = require("@nestjs/common");
const registrations_service_1 = require("./registrations.service");
const create_registration_dto_1 = require("./dto/create-registration.dto");
const update_registration_dto_1 = require("./dto/update-registration.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const common_2 = require("@nestjs/common");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const find_registrations_query_dto_1 = require("./dto/find-registrations-query.dto");
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
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_registration_dto_1.CreateRegistrationDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Listar todas as inscrições (obs: admins podem listar de todos os usuários)",
    }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, token_payload_param_1.TokenPayloadParam)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_payload_dto_1.TokenPayloadDto,
        find_registrations_query_dto_1.FindRegistrationsQueryDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Listar detalhes de uma inscrição específica",
    }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar uma inscrição (ex: status) específica" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_registration_dto_1.UpdateRegistrationDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluír(cancelar) uma inscrição específica" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], RegistrationsController.prototype, "remove", null);
exports.RegistrationsController = RegistrationsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_2.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("registrations"),
    __metadata("design:paramtypes", [registrations_service_1.RegistrationsService])
], RegistrationsController);
//# sourceMappingURL=registrations.controller.js.map