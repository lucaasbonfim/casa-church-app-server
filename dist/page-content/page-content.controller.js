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
exports.PageContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
const update_page_content_dto_1 = require("./dto/update-page-content.dto");
const page_content_service_1 = require("./page-content.service");
let PageContentController = class PageContentController {
    pageContentService;
    constructor(pageContentService) {
        this.pageContentService = pageContentService;
    }
    findBySlug(slug) {
        return this.pageContentService.findBySlug(slug);
    }
    update(slug, updatePageContentDto, tokenPayload) {
        return this.pageContentService.update(slug, updatePageContentDto, tokenPayload);
    }
};
exports.PageContentController = PageContentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Buscar conteudo de uma pagina publica" }),
    (0, common_1.Get)(":slug"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PageContentController.prototype, "findBySlug", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Atualizar conteudo de uma pagina publica" }),
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.Patch)(":slug"),
    __param(0, (0, common_1.Param)("slug")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_page_content_dto_1.UpdatePageContentDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], PageContentController.prototype, "update", null);
exports.PageContentController = PageContentController = __decorate([
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("page-content"),
    __metadata("design:paramtypes", [page_content_service_1.PageContentService])
], PageContentController);
//# sourceMappingURL=page-content.controller.js.map