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
exports.CreateEventFeedbackDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateEventFeedbackDto {
    eventId;
    rating;
    comment;
}
exports.CreateEventFeedbackDto = CreateEventFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "ID do evento para o qual a avaliação está sendo dada",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo ID do evento não pode ser vazio." }),
    (0, class_validator_1.IsUUID)("4", { message: "O campo ID do evento deve ser um UUID válido." }),
    __metadata("design:type", String)
], CreateEventFeedbackDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: "Avaliação do evento (de 1 a 5)",
        minimum: 1,
        maximum: 5,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo avaliação não pode ser vazio." }),
    (0, class_validator_1.IsInt)({ message: "A avaliação deve ser um número inteiro." }),
    (0, class_validator_1.Min)(1, { message: "A avaliação mínima é 1." }),
    (0, class_validator_1.Max)(5, { message: "A avaliação máxima é 5." }),
    __metadata("design:type", Number)
], CreateEventFeedbackDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Evento maravilhoso! Organização impecável e conteúdo inspirador.",
        description: "Comentário opcional sobre o evento (máx. 250 caracteres)",
        maxLength: 250,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O campo comentário deve ser um texto." }),
    (0, class_validator_1.MaxLength)(250, {
        message: "O comentário deve ter no máximo 250 caracteres.",
    }),
    __metadata("design:type", String)
], CreateEventFeedbackDto.prototype, "comment", void 0);
//# sourceMappingURL=create-event-feedback.dto.js.map