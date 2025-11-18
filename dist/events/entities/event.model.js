"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const models_1 = require("../../models");
let Event = class Event extends sequelize_typescript_2.Model {
};
exports.Event = Event;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_1.DataType.UUID)
], Event.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false })
], Event.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(500) })
], Event.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false })
], Event.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false })
], Event.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.User),
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Event.prototype, "createdBy", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Event.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.Location),
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.UUID })
], Event.prototype, "locationId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => models_1.Location)
], Event.prototype, "location", void 0);
exports.Event = Event = __decorate([
    (0, sequelize_typescript_2.Table)({ tableName: "events", schema: "casa-church", timestamps: true })
], Event);
