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
exports.CreateEventDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateEventDto {
    title;
    description;
    startDate;
    endDate;
    locationId;
    image;
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Encontro da Casa Church",
        description: "Título do evento (máx. 255 caracteres)",
        maxLength: 255,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo título do evento não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo título do evento não é um válido" }),
    (0, class_validator_1.MaxLength)(255, {
        message: "O título do evento deve ter o tamanho máximo de 255 caracteres",
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Um encontro especial para todos os membros da comunidade",
        description: "Descrição do evento (máx. 500 caracteres)",
        maxLength: 500,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo descrição do evento não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo descrição do evento não é um válido" }),
    (0, class_validator_1.MaxLength)(500, {
        message: "A descrição do evento deve ter o tamanho máximo de 500 caracteres",
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-11-20T18:00:00.000Z",
        description: "Data de início do evento",
        type: String,
        format: "date-time",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo data de início não pode ser vazio." }),
    (0, class_validator_1.IsDate)({ message: 'O campo data de início deve ser do tipo "data"' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-11-20T20:00:00.000Z",
        description: "Data de término do evento",
        type: String,
        format: "date-time",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo data de término não pode ser vazio." }),
    (0, class_validator_1.IsDate)({ message: 'O campo data de término deve ser do tipo "data"' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "d0f4e6d1-4a23-4c7a-9c9b-8b01f4c0e5e9",
        description: "ID do local onde o evento será realizado",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo local do evento não pode ser vazio." }),
    (0, class_validator_1.IsUUID)("4", { message: "O campo local do evento deve ser um UUID válido." }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://images.unsplash.com/photo-1234567890",
        description: "URL da imagem do evento",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O campo imagem deve ser uma string válida" }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "image", void 0);
//# sourceMappingURL=create-event.dto.js.map