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
exports.ResetPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ResetPasswordDto {
    token;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Token recebido no link de redefinicao de senha",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "O token de redefinicao e obrigatorio." }),
    (0, class_validator_1.IsString)({ message: "O token de redefinicao deve ser um texto." }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "novaSenha123",
        description: "Nova senha do usuario",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "A nova senha e obrigatoria." }),
    (0, class_validator_1.IsString)({ message: "A nova senha deve ser um texto." }),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(6, { message: "A senha deve conter no minimo 6 caracteres" }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=reset-password.dto.js.map