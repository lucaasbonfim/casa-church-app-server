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
exports.CreatePostDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePostDto {
    userId;
    content;
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
        description: "ID do usuário que está criando a postagem",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O usuário da postagem não pode ser vazio" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Hoje tivemos um encontro incrível na comunidade!",
        description: "Conteúdo da postagem (máximo 625 caracteres)",
        maxLength: 625,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O conteúdo da postagem não pode ser vazio" }),
    (0, class_validator_1.IsString)({ message: "O conteúdo da postagem deve ser um texto" }),
    (0, class_validator_1.MaxLength)(625, {
        message: "O conteúdo da postagem possui o tamanho máximo de 625 caracteres",
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
//# sourceMappingURL=create-post.dto.js.map