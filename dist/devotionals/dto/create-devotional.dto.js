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
exports.CreateDevotionalDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDevotionalDto {
    title;
    devotionalDate;
    verseReference;
    verseText;
    content;
    imageUrl;
    videoUrl;
    published;
}
exports.CreateDevotionalDto = CreateDevotionalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Descanso para hoje" }),
    (0, class_validator_1.IsNotEmpty)({ message: "O titulo do devocional nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O titulo do devocional deve ser um texto." }),
    (0, class_validator_1.MaxLength)(160, {
        message: "O titulo do devocional deve ter no maximo 160 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-04-24T12:00:00.000Z" }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "A data do devocional deve ser uma data valida." }),
    __metadata("design:type", Date)
], CreateDevotionalDto.prototype, "devotionalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Salmos 23:1" }),
    (0, class_transformer_1.Transform)(({ value }) => (value === "" ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A referencia biblica deve ser um texto." }),
    (0, class_validator_1.MaxLength)(120, {
        message: "A referencia biblica deve ter no maximo 120 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "verseReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "O Senhor e o meu pastor; nada me faltara." }),
    (0, class_transformer_1.Transform)(({ value }) => (value === "" ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O texto do versiculo deve ser um texto." }),
    (0, class_validator_1.MaxLength)(500, {
        message: "O texto do versiculo deve ter no maximo 500 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "verseText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Uma reflexao para caminhar com Deus hoje." }),
    (0, class_validator_1.IsNotEmpty)({ message: "O conteudo do devocional nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O conteudo do devocional deve ser um texto." }),
    (0, class_validator_1.MaxLength)(5000, {
        message: "O conteudo do devocional deve ter no maximo 5000 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://exemplo.com/imagem.jpg" }),
    (0, class_transformer_1.Transform)(({ value }) => (value === "" ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A URL da imagem deve ser um texto." }),
    (0, class_validator_1.IsUrl)({}, { message: "A URL da imagem deve ser valida." }),
    (0, class_validator_1.MaxLength)(2000, {
        message: "A URL da imagem deve ter no maximo 2000 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://www.youtube.com/watch?v=abc123" }),
    (0, class_transformer_1.Transform)(({ value }) => (value === "" ? undefined : value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A URL do video deve ser um texto." }),
    (0, class_validator_1.IsUrl)({}, { message: "A URL do video deve ser valida." }),
    (0, class_validator_1.MaxLength)(2000, {
        message: "A URL do video deve ter no maximo 2000 caracteres.",
    }),
    __metadata("design:type", String)
], CreateDevotionalDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: "O campo publicado deve ser booleano." }),
    __metadata("design:type", Boolean)
], CreateDevotionalDto.prototype, "published", void 0);
//# sourceMappingURL=create-devotional.dto.js.map