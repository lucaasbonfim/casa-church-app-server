"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
let Location = class Location extends sequelize_typescript_2.Model {
};
exports.Location = Location;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_1.DataType.UUID)
], Location.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(200), allowNull: false })
], Location.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(100), allowNull: false })
], Location.prototype, "street", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(10), allowNull: false })
], Location.prototype, "number", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false })
], Location.prototype, "neighborhood", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false })
], Location.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false })
], Location.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(2), allowNull: false })
], Location.prototype, "uf", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.INTEGER })
], Location.prototype, "capacity", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Location.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Location.prototype, "updatedAt", void 0);
exports.Location = Location = __decorate([
    (0, sequelize_typescript_2.Table)({ tableName: "locations", schema: "casa-church", timestamps: true })
], Location);
