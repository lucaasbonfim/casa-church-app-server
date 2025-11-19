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
exports.CreateLessonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLessonDto {
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Uma Vida com Deus",
        description: "Titulo da aula (máx. 100 caracteres)",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O título não pode estar vazio" }),
    (0, class_validator_1.IsString)({ message: "O título não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Esta aula fala sobre a importância de manter uma vida guiada pela fé e comunhão com Deus.",
        description: "Descrição da aula (máx. 255 caracteres)",
    }),
    (0, class_validator_1.IsString)({ message: "A descrição não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
        description: "ID do sermão que a aula faz parte.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O sermão não pode estar vazio" }),
    (0, class_validator_1.IsString)({ message: "O sermão não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "sermonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://www.youtube.com/watch?v=SB5fhTaoGYU",
        description: "Link do vídeo associado a aula, usado para reprodução online",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O link do video não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Número que define a ordem de exibição das aulas.",
    }),
    (0, class_validator_1.IsNumber)({}, { message: "A ordem não está no formato adequado" }),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "ordem", void 0);
//# sourceMappingURL=create-lesson.dto.js.map