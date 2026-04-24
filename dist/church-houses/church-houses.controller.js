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
exports.ChurchHousesController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const swagger_1 = require("@nestjs/swagger");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
const church_houses_service_1 = require("./church-houses.service");
const create_church_house_dto_1 = require("./dto/create-church-house.dto");
const find_church_houses_query_dto_1 = require("./dto/find-church-houses-query.dto");
const update_church_house_dto_1 = require("./dto/update-church-house.dto");
let ChurchHousesController = class ChurchHousesController {
    churchHousesService;
    constructor(churchHousesService) {
        this.churchHousesService = churchHousesService;
    }
    create(createChurchHouseDto, tokenPayload) {
        return this.churchHousesService.create(createChurchHouseDto, tokenPayload);
    }
    findAll(findQuery) {
        return this.churchHousesService.findAll(findQuery);
    }
    findOne(id) {
        return this.churchHousesService.findOne(id);
    }
    update(id, updateChurchHouseDto, tokenPayload) {
        return this.churchHousesService.update(id, updateChurchHouseDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.churchHousesService.remove(id, tokenPayload);
    }
};
exports.ChurchHousesController = ChurchHousesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Cadastrar novo CI" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_church_house_dto_1.CreateChurchHouseDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], ChurchHousesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar CIs" }),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_church_houses_query_dto_1.FindChurchHousesQueryDto]),
    __metadata("design:returntype", void 0)
], ChurchHousesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Buscar CI por id" }),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChurchHousesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar CI" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_church_house_dto_1.UpdateChurchHouseDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], ChurchHousesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Remover CI" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], ChurchHousesController.prototype, "remove", null);
exports.ChurchHousesController = ChurchHousesController = __decorate([
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("church-houses"),
    __metadata("design:paramtypes", [church_houses_service_1.ChurchHousesService])
], ChurchHousesController);
//# sourceMappingURL=church-houses.controller.js.map