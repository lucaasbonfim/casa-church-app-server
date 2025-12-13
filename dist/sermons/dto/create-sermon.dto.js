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
exports.CreateSermonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSermonDto {
}
exports.CreateSermonDto = CreateSermonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Uma Vida com Deus",
        description: "Titulo do sermão (máx. 100 caracteres)",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O título não pode estar vazio" }),
    (0, class_validator_1.IsString)({ message: "O título não está no formato adequado" }),
    __metadata("design:type", String)
], CreateSermonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Este sermão fala sobre a importância de manter uma vida guiada pela fé e comunhão com Deus.",
        description: "Descrição do sermão (máx. 255 caracteres)",
    }),
    (0, class_validator_1.IsString)({ message: "A descrição não está no formato adequado" }),
    __metadata("design:type", String)
], CreateSermonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
        description: "ID do usuário que criou o sermão",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O usuário não pode estar vazio" }),
    (0, class_validator_1.IsString)({ message: "O usuário não está no formato adequado" }),
    __metadata("design:type", String)
], CreateSermonDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-sermon.dto.js.map