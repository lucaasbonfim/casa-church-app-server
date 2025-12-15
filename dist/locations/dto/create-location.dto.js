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
exports.CreateLocationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateLocationDto {
    name;
    street;
    number;
    neighborhood;
    city;
    state;
    uf;
    capacity;
}
exports.CreateLocationDto = CreateLocationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Salão Principal",
        description: "Nome do local (máx. 200 caracteres)",
        maxLength: 200,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo nome do local não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo nome do local não é válido." }),
    (0, class_validator_1.MaxLength)(200, {
        message: "O nome do local deve ter no máximo 200 caracteres.",
    }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Rua das Flores",
        description: "Rua do local (máx. 100 caracteres)",
        maxLength: 100,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo rua não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo rua não é válido." }),
    (0, class_validator_1.MaxLength)(100, { message: "A rua deve ter no máximo 100 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123",
        description: "Número do local (máx. 10 caracteres)",
        maxLength: 10,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo número não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo número não é válido." }),
    (0, class_validator_1.MaxLength)(10, { message: "O número deve ter no máximo 10 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Centro",
        description: "Bairro do local (máx. 50 caracteres)",
        maxLength: 50,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo bairro não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo bairro não é válido." }),
    (0, class_validator_1.MaxLength)(50, { message: "O bairro deve ter no máximo 50 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Rio de Janeiro",
        description: "Cidade do local (máx. 50 caracteres)",
        maxLength: 50,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo cidade não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo cidade não é válido." }),
    (0, class_validator_1.MaxLength)(50, { message: "A cidade deve ter no máximo 50 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Rio de Janeiro",
        description: "Estado do local (máx. 50 caracteres)",
        maxLength: 50,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo estado não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo estado não é válido." }),
    (0, class_validator_1.MaxLength)(50, { message: "O estado deve ter no máximo 50 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "RJ",
        description: "UF do local (2 caracteres)",
        maxLength: 2,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo UF não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo UF não é válido." }),
    (0, class_validator_1.MaxLength)(2, { message: "A UF deve ter no máximo 2 caracteres." }),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: "Capacidade máxima do local",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: "A capacidade deve ser um número inteiro." }),
    (0, class_validator_1.Min)(1, { message: "A capacidade mínima é 1." }),
    __metadata("design:type", Number)
], CreateLocationDto.prototype, "capacity", void 0);
//# sourceMappingURL=create-location.dto.js.map