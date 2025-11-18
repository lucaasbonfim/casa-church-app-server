"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../../models");
let Lesson = class Lesson extends sequelize_typescript_1.Model {
};
exports.Lesson = Lesson;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID)
], Lesson.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.Sermon),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Lesson.prototype, "sermonId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false })
], Lesson.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false })
], Lesson.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], Lesson.prototype, "videoLink", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false, unique: true })
], Lesson.prototype, "ordem", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Lesson.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Lesson.prototype, "updatedAt", void 0);
exports.Lesson = Lesson = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "lessons", schema: "casa-church", timestamps: true })
], Lesson);
