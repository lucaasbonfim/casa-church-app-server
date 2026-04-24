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
exports.CreateChurchHouseDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateChurchHouseDto {
    name;
    description;
    street;
    number;
    complement;
    neighborhood;
    city;
    state;
    uf;
    zipCode;
    reference;
    contactPhone;
    meetingSchedule;
    latitude;
    longitude;
    active;
}
exports.CreateChurchHouseDto = CreateChurchHouseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CI Jardim Primavera" }),
    (0, class_validator_1.IsNotEmpty)({ message: "O nome do CI nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O nome do CI deve ser um texto." }),
    (0, class_validator_1.MaxLength)(150, { message: "O nome do CI deve ter no maximo 150 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Um ponto de encontro da Casa Church para comunhao, discipulado e oracao.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A descricao deve ser um texto." }),
    (0, class_validator_1.MaxLength)(1000, {
        message: "A descricao deve ter no maximo 1000 caracteres.",
    }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Rua das Acacias" }),
    (0, class_validator_1.IsNotEmpty)({ message: "A rua nao pode ser vazia." }),
    (0, class_validator_1.IsString)({ message: "A rua deve ser um texto." }),
    (0, class_validator_1.MaxLength)(120, { message: "A rua deve ter no maximo 120 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "145" }),
    (0, class_validator_1.IsNotEmpty)({ message: "O numero nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O numero deve ser um texto." }),
    (0, class_validator_1.MaxLength)(20, { message: "O numero deve ter no maximo 20 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Casa 2" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O complemento deve ser um texto." }),
    (0, class_validator_1.MaxLength)(120, {
        message: "O complemento deve ter no maximo 120 caracteres.",
    }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Jardim Primavera" }),
    (0, class_validator_1.IsNotEmpty)({ message: "O bairro nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O bairro deve ser um texto." }),
    (0, class_validator_1.MaxLength)(80, { message: "O bairro deve ter no maximo 80 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Duque de Caxias" }),
    (0, class_validator_1.IsNotEmpty)({ message: "A cidade nao pode ser vazia." }),
    (0, class_validator_1.IsString)({ message: "A cidade deve ser um texto." }),
    (0, class_validator_1.MaxLength)(80, { message: "A cidade deve ter no maximo 80 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Rio de Janeiro" }),
    (0, class_validator_1.IsNotEmpty)({ message: "O estado nao pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O estado deve ser um texto." }),
    (0, class_validator_1.MaxLength)(80, { message: "O estado deve ter no maximo 80 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "RJ" }),
    (0, class_validator_1.IsNotEmpty)({ message: "A UF nao pode ser vazia." }),
    (0, class_validator_1.IsString)({ message: "A UF deve ser um texto." }),
    (0, class_validator_1.MaxLength)(2, { message: "A UF deve ter no maximo 2 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "25065-120" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O CEP deve ser um texto." }),
    (0, class_validator_1.MaxLength)(12, { message: "O CEP deve ter no maximo 12 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Proximo a pracinha principal" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A referencia deve ser um texto." }),
    (0, class_validator_1.MaxLength)(160, {
        message: "A referencia deve ter no maximo 160 caracteres.",
    }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "+55 21 99999-8888" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "O telefone de contato deve ser um texto." }),
    (0, class_validator_1.MaxLength)(30, {
        message: "O telefone de contato deve ter no maximo 30 caracteres.",
    }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Quartas, 20h" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "A agenda deve ser um texto." }),
    (0, class_validator_1.MaxLength)(220, { message: "A agenda deve ter no maximo 220 caracteres." }),
    __metadata("design:type", String)
], CreateChurchHouseDto.prototype, "meetingSchedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -22.756341 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsLatitude)({ message: "A latitude informada nao e valida." }),
    __metadata("design:type", Number)
], CreateChurchHouseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -43.302891 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsLongitude)({ message: "A longitude informada nao e valida." }),
    __metadata("design:type", Number)
], CreateChurchHouseDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: "O campo ativo deve ser booleano." }),
    __metadata("design:type", Boolean)
], CreateChurchHouseDto.prototype, "active", void 0);
//# sourceMappingURL=create-church-house.dto.js.map