"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLessonProgressDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const sequelize_1 = require("sequelize");
const swagger_1 = require("@nestjs/swagger");
const find_query_dto_1 = require("../../common/dto/find-query.dto");
class FindLessonProgressDto extends find_query_dto_1.FindQueryDto {
    lessonId;
}
exports.FindLessonProgressDto = FindLessonProgressDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "5ccc3035-ae93-4c86-969b-d6610c516e73",
        description: "ID da aula no formato UUID v4",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => sequelize_1.UUIDV4),
    (0, class_validator_1.IsUUID)(4, { message: "O parâmetro aula deve ser uma string" })
], FindLessonProgressDto.prototype, "lessonId", void 0);
