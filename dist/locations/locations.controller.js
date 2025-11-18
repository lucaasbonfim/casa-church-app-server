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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let LocationsController = class LocationsController {
    locationsService;
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    create(createLocationDto, tokenPayload) {
        return this.locationsService.create(createLocationDto, tokenPayload);
    }
    findAll(findLocationsQuery) {
        return this.locationsService.findAll(findLocationsQuery);
    }
    findOne(id) {
        return this.locationsService.findOne(id);
    }
    update(id, updateLocationDto, tokenPayload) {
        return this.locationsService.update(id, updateLocationDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.locationsService.remove(id, tokenPayload);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Cadastrar novos locais" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], LocationsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todos os locais" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)())
], LocationsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar detalhes de um local específico" }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id"))
], LocationsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar um local específico" }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], LocationsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir um local específico" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], LocationsController.prototype, "remove", null);
exports.LocationsController = LocationsController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("locations")
], LocationsController);
