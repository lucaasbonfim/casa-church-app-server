"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../../models");
let Like = class Like extends sequelize_typescript_1.Model {
};
exports.Like = Like;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID)
], Like.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.Post),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Like.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Like.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Like.prototype, "createdAt", void 0);
exports.Like = Like = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "likes", schema: "casa-church", timestamps: true, updatedAt: false, })
], Like);
