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
exports.FindRegistrationsQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindRegistrationsQueryDto extends find_query_dto_1.FindQueryDto {
    userId;
    eventId;
    status;
}
exports.FindRegistrationsQueryDto = FindRegistrationsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "dc30bf20-1094-4ee7-b515-9e7d3b2355a4",
        description: "Filtra inscrições pelo ID do usuário (UUID v4)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro usuário deve ser um tipo válido" }),
    __metadata("design:type", String)
], FindRegistrationsQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "66d23d75-a009-46ed-b4f9-d28ab47625bc",
        description: "Filtra inscrições pelo ID do evento (UUID v4)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro evento deve ser um tipo válido" }),
    __metadata("design:type", String)
], FindRegistrationsQueryDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "pending",
        description: "Filtra inscrições pelo status (ex: confirmed, pending, canceled)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O parâmetro status deve ser um texto" }),
    __metadata("design:type", String)
], FindRegistrationsQueryDto.prototype, "status", void 0);
//# sourceMappingURL=find-registrations-query.dto.js.map