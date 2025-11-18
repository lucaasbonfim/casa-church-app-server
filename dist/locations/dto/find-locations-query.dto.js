"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLocationsQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindLocationsQueryDto extends find_query_dto_1.FindQueryDto {
    name;
    street;
    city;
    state;
    uf;
}
exports.FindLocationsQueryDto = FindLocationsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Salão Principal",
        description: "Filtra locais pelo nome",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro nome deve ser um texto" })
], FindLocationsQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Rua das Flores",
        description: "Filtra locais pela rua",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro rua deve ser um texto" })
], FindLocationsQueryDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Rio de Janeiro",
        description: "Filtra locais pela cidade",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro cidade deve ser um texto" })
], FindLocationsQueryDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Rio de Janeiro",
        description: "Filtra locais pelo estado",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro estado deve ser um texto" })
], FindLocationsQueryDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "RJ",
        description: "Filtra locais pela UF",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro UF deve ser um texto" })
], FindLocationsQueryDto.prototype, "uf", void 0);
