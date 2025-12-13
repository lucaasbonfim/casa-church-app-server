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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const create_like_dto_1 = require("./dto/create-like.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const find_likes_query_dto_1 = require("./dto/find-likes-query.dto");
const swagger_1 = require("@nestjs/swagger");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let LikesController = class LikesController {
    likesService;
    constructor(likesService) {
        this.likesService = likesService;
    }
    create(createLikeDto, tokenPayload) {
        return this.likesService.create(createLikeDto, tokenPayload);
    }
    findAll(findLikesQuery) {
        return this.likesService.findAll(findLikesQuery);
    }
    findOne(id) {
        return this.likesService.findOne(id);
    }
    remove(id, tokenPayload) {
        return this.likesService.remove(id, tokenPayload);
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar nova curtida" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todas curtida" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_likes_query_dto_1.FindLikesQueryDto]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Visualizar detalhes de uma curtida" }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Deletar uma curtida" }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "remove", null);
exports.LikesController = LikesController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map