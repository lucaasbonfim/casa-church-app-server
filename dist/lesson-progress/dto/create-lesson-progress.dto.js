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
exports.CreateLessonProgressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLessonProgressDto {
}
exports.CreateLessonProgressDto = CreateLessonProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
        description: "ID do usuário no formato UUID v4.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O usuario não pode estar vazio" }),
    (0, class_validator_1.IsString)({ message: "O usuario não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonProgressDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
        description: "ID da aula no formato UUID v4.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "A aula não pode estar vazia" }),
    (0, class_validator_1.IsString)({ message: "A aula não está no formato adequado" }),
    __metadata("design:type", String)
], CreateLessonProgressDto.prototype, "lessonId", void 0);
//# sourceMappingURL=create-lesson-progress.dto.js.map