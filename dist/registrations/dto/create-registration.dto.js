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
exports.CreateRegistrationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRegistrationDto {
    userId;
    eventId;
}
exports.CreateRegistrationDto = CreateRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dc30bf20-1094-4ee7-b515-9e7d3b2355a4",
        description: "ID do usuário que está sendo registrado no evento",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo usuário não pode ser vazio" }),
    (0, class_validator_1.IsString)({ message: "O campo usuário não está no formato adequado" }),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "66d23d75-a009-46ed-b4f9-d28ab47625bc",
        description: "ID do evento no qual o usuário será registrado",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo evento não pode ser vazio" }),
    (0, class_validator_1.IsString)({ message: "O campo evento não está no formato adequado" }),
    __metadata("design:type", String)
], CreateRegistrationDto.prototype, "eventId", void 0);
//# sourceMappingURL=create-registration.dto.js.map