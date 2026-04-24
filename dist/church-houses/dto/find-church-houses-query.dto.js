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
exports.FindChurchHousesQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindChurchHousesQueryDto extends find_query_dto_1.FindQueryDto {
    name;
    city;
    uf;
    active;
}
exports.FindChurchHousesQueryDto = FindChurchHousesQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Jardim" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parametro nome deve ser um texto." }),
    __metadata("design:type", String)
], FindChurchHousesQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Duque de Caxias" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parametro cidade deve ser um texto." }),
    __metadata("design:type", String)
], FindChurchHousesQueryDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "RJ" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parametro UF deve ser um texto." }),
    __metadata("design:type", String)
], FindChurchHousesQueryDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: "O parametro ativo deve ser booleano." }),
    __metadata("design:type", Boolean)
], FindChurchHousesQueryDto.prototype, "active", void 0);
//# sourceMappingURL=find-church-houses-query.dto.js.map