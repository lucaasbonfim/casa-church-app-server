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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_types_1 = require("../types/user.types");
class CreateUserDto {
    name;
    email;
    password;
    role;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Anderson Souza",
        description: "Nome completo do usuário (máx. 150 caracteres)",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo nome não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo nome deve ser um texto." }),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "anderson.souza@email.com",
        description: "Endereço de e-mail válido do usuário (máx. 100 caracteres)",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo email não pode ser vazio." }),
    (0, class_validator_1.IsEmail)({}, { message: "O campo email deve ser um email válido." }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "senhaSegura123",
        description: "Senha de acesso do usuário (mín. 6 caracteres)",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo senha não pode ser vazio." }),
    (0, class_validator_1.IsString)({ message: "O campo senha deve ser um texto." }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user",
        description: "Cargo do usuário dentro do sistema",
        enum: user_types_1.UserRoles,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O campo cargo não pode ser vazio." }),
    (0, class_validator_1.IsEnum)(user_types_1.UserRoles, { message: "O campo cargo deve ser 'user' ou 'admin'." }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=create-user.dto.js.map