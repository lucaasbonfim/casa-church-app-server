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
exports.EventFeedback = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const models_1 = require("../../models");
let EventFeedback = class EventFeedback extends sequelize_typescript_2.Model {
};
exports.EventFeedback = EventFeedback;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], EventFeedback.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.Event),
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], EventFeedback.prototype, "eventId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => models_1.User),
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], EventFeedback.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    }),
    __metadata("design:type", Number)
], EventFeedback.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_1.DataType.STRING(250) }),
    __metadata("design:type", String)
], EventFeedback.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], EventFeedback.prototype, "createdAt", void 0);
exports.EventFeedback = EventFeedback = __decorate([
    (0, sequelize_typescript_2.Table)({
        tableName: "event_feedbacks",
        schema: "casa-church",
        timestamps: true,
        updatedAt: false,
    })
], EventFeedback);
//# sourceMappingURL=event-feedback.model.js.map