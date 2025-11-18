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
exports.DonationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let DonationsController = class DonationsController {
    donationsService;
    constructor(donationsService) {
        this.donationsService = donationsService;
    }
    create(createDonationDto, tokenPayload) {
        return this.donationsService.create(createDonationDto, tokenPayload);
    }
    findAll(findDonationsQuery, tokenPayload) {
        return this.donationsService.findAll(findDonationsQuery, tokenPayload);
    }
    findOne(id, tokenPayload) {
        return this.donationsService.findOne(id, tokenPayload);
    }
    update(id, updateDonationDto, tokenPayload) {
        return this.donationsService.update(id, updateDonationDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.donationsService.remove(id, tokenPayload);
    }
};
exports.DonationsController = DonationsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar nova doação" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], DonationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todas doações" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], DonationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Visualizar detalhes de uma doação" }),
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], DonationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar uma doação" }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], DonationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Deletar uma doação" }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], DonationsController.prototype, "remove", null);
exports.DonationsController = DonationsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)('donations')
], DonationsController);
