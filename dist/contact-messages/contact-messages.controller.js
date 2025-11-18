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
exports.ContactMessagesController = void 0;
const common_1 = require("@nestjs/common");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let ContactMessagesController = class ContactMessagesController {
    contactMessagesService;
    constructor(contactMessagesService) {
        this.contactMessagesService = contactMessagesService;
    }
    create(createContactMessageDto, tokenPayload) {
        return this.contactMessagesService.create(createContactMessageDto, tokenPayload);
    }
    findAll(findContactMessagesQuery) {
        return this.contactMessagesService.findAll(findContactMessagesQuery);
    }
    findOne(id) {
        return this.contactMessagesService.findOne(id);
    }
    update(id, updateContactMessageDto, tokenPayload) {
        return this.contactMessagesService.update(id, updateContactMessageDto, tokenPayload);
    }
    remove(id, tokenPayload) {
        return this.contactMessagesService.remove(id, tokenPayload);
    }
};
exports.ContactMessagesController = ContactMessagesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar novas mensagens no fórum de discussão" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], ContactMessagesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todas as mensagens do fórum de discussão" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)())
], ContactMessagesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Listar detalhes de uma mensagem do fórum de discussão",
    }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id"))
], ContactMessagesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Atualizar uma mensagem específica do fórum de discussão",
    }),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, token_payload_param_1.TokenPayloadParam)())
], ContactMessagesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Excluir uma mensagem específica do fórum de discussão",
    }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)())
], ContactMessagesController.prototype, "remove", null);
exports.ContactMessagesController = ContactMessagesController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("contact-messages")
], ContactMessagesController);
