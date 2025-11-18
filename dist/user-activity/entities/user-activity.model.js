"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../../models");
let UserActivity = class UserActivity extends sequelize_typescript_1.Model {
};
exports.UserActivity = UserActivity;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    })
], UserActivity.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })
], UserActivity.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => models_1.User)
], UserActivity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false })
], UserActivity.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(200) })
], UserActivity.prototype, "endpoint", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT })
], UserActivity.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], UserActivity.prototype, "createdAt", void 0);
exports.UserActivity = UserActivity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "user_activity_logs",
        schema: "casa-church",
        timestamps: true,
    })
], UserActivity);
