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
exports.FindDonationsQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindDonationsQueryDto extends find_query_dto_1.FindQueryDto {
    userId;
}
exports.FindDonationsQueryDto = FindDonationsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
        description: "Filtra pelo ID do usuário (UUID v4)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro usuário deve ser um tipo válido" }),
    __metadata("design:type", String)
], FindDonationsQueryDto.prototype, "userId", void 0);
//# sourceMappingURL=find-donations-query.dto.js.map