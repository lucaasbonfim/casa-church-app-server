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
exports.EventFeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const event_feedbacks_service_1 = require("./event-feedbacks.service");
const create_event_feedback_dto_1 = require("./dto/create-event-feedback.dto");
const auth_token_guard_1 = require("../auth/guard/auth-token.guard");
const token_payload_param_1 = require("../auth/params/token-payload.param");
const token_payload_dto_1 = require("../auth/dto/token-payload.dto");
const swagger_1 = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const find_event_feedbacks_query_dto_1 = require("./dto/find-event-feedbacks-query.dto");
const user_activity_interceptor_1 = require("../common/interceptors/user-activity.interceptor");
let EventFeedbacksController = class EventFeedbacksController {
    eventFeedbacksService;
    constructor(eventFeedbacksService) {
        this.eventFeedbacksService = eventFeedbacksService;
    }
    create(createEventFeedbackDto, tokenPayload) {
        return this.eventFeedbacksService.create(createEventFeedbackDto, tokenPayload);
    }
    findAll(findEventFeedbacksQuery) {
        return this.eventFeedbacksService.findAll(findEventFeedbacksQuery);
    }
    findOne(id) {
        return this.eventFeedbacksService.findOne(id);
    }
    remove(id, tokenPayload) {
        return this.eventFeedbacksService.remove(id, tokenPayload);
    }
};
exports.EventFeedbacksController = EventFeedbacksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Criar um novo feedback para um evento" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_feedback_dto_1.CreateEventFeedbackDto,
        token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], EventFeedbacksController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar todos os feedbacks de eventos" }),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_event_feedbacks_query_dto_1.FindEventFeedbacksQueryDto]),
    __metadata("design:returntype", void 0)
], EventFeedbacksController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Listar detalhes de um feedbacks específico" }),
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventFeedbacksController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Excluir um feedback específico" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, token_payload_param_1.TokenPayloadParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, token_payload_dto_1.TokenPayloadDto]),
    __metadata("design:returntype", void 0)
], EventFeedbacksController.prototype, "remove", null);
exports.EventFeedbacksController = EventFeedbacksController = __decorate([
    (0, swagger_1.ApiSecurity)("auth-token"),
    (0, common_1.UseGuards)(auth_token_guard_1.AuthTokenGuard),
    (0, common_1.UseInterceptors)(user_activity_interceptor_1.UserActivityInterceptor),
    (0, common_1.Controller)("event-feedbacks"),
    __metadata("design:paramtypes", [event_feedbacks_service_1.EventFeedbacksService])
], EventFeedbacksController);
//# sourceMappingURL=event-feedbacks.controller.js.map