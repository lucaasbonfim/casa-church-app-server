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
exports.FindEventsQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindEventsQueryDto extends find_query_dto_1.FindQueryDto {
    title;
    startDate;
    endDate;
    createdBy;
}
exports.FindEventsQueryDto = FindEventsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Encontro da Casa Church",
        description: "Filtra eventos pelo título",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro título deve ser um texto" }),
    __metadata("design:type", String)
], FindEventsQueryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "2025-11-20T18:00:00.000Z",
        description: "Filtra eventos pela data de início",
        type: String,
        format: "date-time",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "O parâmetro data de início deve ser uma data válida" }),
    __metadata("design:type", Date)
], FindEventsQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "2025-11-20T20:00:00.000Z",
        description: "Filtra eventos pela data de término",
        type: String,
        format: "date-time",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "O parâmetro data de término deve ser uma data válida" }),
    __metadata("design:type", Date)
], FindEventsQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
        description: "Filtra eventos pelo ID do usuário que criou",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro autor deve ser um tipo válido" }),
    __metadata("design:type", String)
], FindEventsQueryDto.prototype, "createdBy", void 0);
//# sourceMappingURL=find-events-query.dto.js.map