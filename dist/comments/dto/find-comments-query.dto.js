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
exports.FindCommentsQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class FindCommentsQueryDto {
    page = 1;
    limit = 10;
    postId;
    orderBy = "createdAt";
    orderDirection = "DESC";
}
exports.FindCommentsQueryDto = FindCommentsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "Número da página para paginação (valor padrão: 1)",
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "O parâmetro página deve ser um inteiro" }),
    (0, class_validator_1.Min)(1, { message: "O parâmetro página deve ser no mínimo 1" }),
    __metadata("design:type", Number)
], FindCommentsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: "Quantidade máxima de registros por página (valor padrão: 10)",
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "O parâmetro limite deve ser um inteiro" }),
    (0, class_validator_1.Min)(1, { message: "O parâmetro limite deve ser no mínimo 1" }),
    __metadata("design:type", Number)
], FindCommentsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
        description: "Filtra pelo ID da postagem (UUID v4)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro postagem deve ser um tipo válido" }),
    __metadata("design:type", String)
], FindCommentsQueryDto.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "createdAt",
        description: "Campo usado para ordenar os resultados (valor padrão: createdAt)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro ordenar deve ser um texto" }),
    __metadata("design:type", String)
], FindCommentsQueryDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "DESC",
        description: "Direção da ordenação: ASC ou DESC (valor padrão: DESC)",
        enum: ["ASC", "DESC"],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["ASC", "DESC"], {
        message: "O parâmetro direção deve ser ASC ou DESC",
    }),
    __metadata("design:type", String)
], FindCommentsQueryDto.prototype, "orderDirection", void 0);
//# sourceMappingURL=find-comments-query.dto.js.map