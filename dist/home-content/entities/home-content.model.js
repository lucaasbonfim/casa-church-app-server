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
exports.HomeContent = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let HomeContent = class HomeContent extends sequelize_typescript_1.Model {
};
exports.HomeContent = HomeContent;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], HomeContent.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "heroTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "heroSubtitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], HomeContent.prototype, "heroImageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "aboutTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "aboutDescription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], HomeContent.prototype, "aboutImageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(60), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "aboutButtonText", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "aboutButtonLink", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "eventsTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "eventsDescription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], HomeContent.prototype, "eventsImageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(60), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "eventsButtonText", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "eventsButtonLink", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(120), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "ciTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "ciDescription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", Object)
], HomeContent.prototype, "ciImageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(60), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "ciButtonText", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "ciButtonLink", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)("Você é bem vindo a casa!"),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(160), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "footerWelcomePhrase", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)("Domingos, 10h e 19h"),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(220), allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "footerServiceDays", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)("Endereço da Casa Church"),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], HomeContent.prototype, "footerAddress", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], HomeContent.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], HomeContent.prototype, "updatedAt", void 0);
exports.HomeContent = HomeContent = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "home_content", schema: "casa-church", timestamps: true })
], HomeContent);
//# sourceMappingURL=home-content.model.js.map