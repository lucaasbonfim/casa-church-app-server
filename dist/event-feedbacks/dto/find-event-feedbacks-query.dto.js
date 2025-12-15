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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindEventFeedbacksQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindEventFeedbacksQueryDto extends find_query_dto_1.FindQueryDto {
    eventId;
    rating;
}
exports.FindEventFeedbacksQueryDto = FindEventFeedbacksQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Filtra as avaliações pelo ID do evento",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4", { message: "O parâmetro evento deve ser um valor válido" }),
    __metadata("design:type", String)
], FindEventFeedbacksQueryDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5,
        description: "Filtra as avaliações pela nota (1 a 5)",
        minimum: 1,
        maximum: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "O parâmetro nota deve ser um inteiro" }),
    (0, class_validator_1.Min)(1, { message: "O parâmetro nota deve ser no mínimo 1" }),
    (0, class_validator_1.Max)(5, { message: "O parâmetro nota deve ser no máximo 5" }),
    __metadata("design:type", Number)
], FindEventFeedbacksQueryDto.prototype, "rating", void 0);
//# sourceMappingURL=find-event-feedbacks-query.dto.js.map