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
exports.FindDevotionalsQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindDevotionalsQueryDto extends find_query_dto_1.FindQueryDto {
    title;
    date;
    devotionalDate;
    startDate;
    endDate;
    published;
}
exports.FindDevotionalsQueryDto = FindDevotionalsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Descanso" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parametro titulo deve ser um texto." }),
    __metadata("design:type", String)
], FindDevotionalsQueryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-04-24" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "O parametro data deve ser uma data valida." }),
    __metadata("design:type", Date)
], FindDevotionalsQueryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-04-24" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "A data do devocional deve ser uma data valida." }),
    __metadata("design:type", Date)
], FindDevotionalsQueryDto.prototype, "devotionalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-04-01" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "A data inicial deve ser uma data valida." }),
    __metadata("design:type", Date)
], FindDevotionalsQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-04-30" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: "A data final deve ser uma data valida." }),
    __metadata("design:type", Date)
], FindDevotionalsQueryDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: "O parametro publicado deve ser booleano." }),
    __metadata("design:type", Boolean)
], FindDevotionalsQueryDto.prototype, "published", void 0);
//# sourceMappingURL=find-devotionals-query.dto.js.map