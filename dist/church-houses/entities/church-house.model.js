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
exports.ChurchHouse = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let ChurchHouse = class ChurchHouse extends sequelize_typescript_1.Model {
};
exports.ChurchHouse = ChurchHouse;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], ChurchHouse.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(150), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "street", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(20), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "complement", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(80), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "neighborhood", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(80), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(80), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(2), allowNull: false }),
    __metadata("design:type", String)
], ChurchHouse.prototype, "uf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(12), allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "zipCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(160), allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "reference", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(30), allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "contactPhone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(220), allowNull: true }),
    __metadata("design:type", Object)
], ChurchHouse.prototype, "meetingSchedule", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DOUBLE, allowNull: false }),
    __metadata("design:type", Number)
], ChurchHouse.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DOUBLE, allowNull: false }),
    __metadata("design:type", Number)
], ChurchHouse.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false }),
    __metadata("design:type", Boolean)
], ChurchHouse.prototype, "active", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], ChurchHouse.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], ChurchHouse.prototype, "updatedAt", void 0);
exports.ChurchHouse = ChurchHouse = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "church_houses", schema: "casa-church", timestamps: true })
], ChurchHouse);
//# sourceMappingURL=church-house.model.js.map