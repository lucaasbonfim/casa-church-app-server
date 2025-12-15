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
exports.CreateDonationDto = void 0;
const class_validator_1 = require("class-validator");
const donation_types_1 = require("../types/donation.types");
const donation_types_2 = require("../types/donation.types");
const swagger_1 = require("@nestjs/swagger");
class CreateDonationDto {
    userId;
    amount;
    paymentMethod;
    status;
}
exports.CreateDonationDto = CreateDonationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
        description: "ID do usuário que está criando a doação",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O usuário da postagem não pode ser vazio" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDonationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "150.00",
        description: "Quantia da doação",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo valor não pode ser vazio.' }),
    (0, class_validator_1.IsNumber)({}, { message: 'O campo valor deve ser um número.' }),
    __metadata("design:type", Number)
], CreateDonationDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PIX",
        description: "Método de pagamento da doação. Pode ser 'Cartão de Crédito', 'Cartão de Débito' ou 'PIX'.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo método de pagamento não pode ser vazio.' }),
    (0, class_validator_1.IsEnum)(donation_types_1.PaymentMethods, { message: 'O campo método de pagamento deve ser um dos seguintes valores: Cartão de Crédio, Cartão de Débito ou PIX.' }),
    __metadata("design:type", String)
], CreateDonationDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Aprovado",
        description: "Status da doação. Pode ser 'Aprovado', 'Negado' ou 'Em Processamento'.",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo status não pode ser vazio.' }),
    (0, class_validator_1.IsEnum)(donation_types_2.Status, { message: 'O campo status deve ser um dos seguintes valores: Aprovado, Negado ou Em Processamento.' }),
    __metadata("design:type", String)
], CreateDonationDto.prototype, "status", void 0);
//# sourceMappingURL=create-donation.dto.js.map