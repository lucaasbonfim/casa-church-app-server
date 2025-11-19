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
exports.FindUserActivityQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindUserActivityQueryDto {
    page = 1;
    limit = 10;
    userId;
    action;
}
exports.FindUserActivityQueryDto = FindUserActivityQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Número da página para paginação",
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "O parâmetro página deve ser um número inteiro." }),
    (0, class_validator_1.Min)(1, { message: "O número da página deve ser no mínimo 1." }),
    __metadata("design:type", Number)
], FindUserActivityQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Quantidade de registros por página",
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "O parâmetro limite deve ser um número inteiro." }),
    (0, class_validator_1.Min)(1, { message: "O limite deve ser no mínimo 1." }),
    __metadata("design:type", Number)
], FindUserActivityQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtra logs por ID de usuário",
        example: "e4f9a2d1-5d11-4b1b-b0c7-9f45a1a7b7c1",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4", { message: "O campo userId deve ser um UUID válido." }),
    __metadata("design:type", String)
], FindUserActivityQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtra logs por tipo de ação (ex: POST, DELETE)",
        example: "DELETE",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O campo action deve ser um texto válido." }),
    __metadata("design:type", String)
], FindUserActivityQueryDto.prototype, "action", void 0);
//# sourceMappingURL=find-user-activity-query.dto.js.map