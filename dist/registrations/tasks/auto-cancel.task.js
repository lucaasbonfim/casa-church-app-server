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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCancelTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../../models");
const sequelize_2 = require("sequelize");
const registration_types_1 = require("../types/registration.types");
let AutoCancelTask = class AutoCancelTask {
    registrationModel;
    eventModel;
    constructor(registrationModel, eventModel) {
        this.registrationModel = registrationModel;
        this.eventModel = eventModel;
    }
    async handle() {
        const now = new Date();
        const pastEvents = await this.eventModel.findAll({
            where: { endDate: { [sequelize_2.Op.lt]: now } },
        });
        const eventIds = pastEvents.map((e) => e.id);
        const [count] = await this.registrationModel.update({ status: registration_types_1.RegistrationStatus.CANCELED }, {
            where: {
                eventId: eventIds,
                status: { [sequelize_2.Op.ne]: registration_types_1.RegistrationStatus.CANCELED },
            },
        });
        console.log(`${count} inscrições canceladas automaticamente.`);
    }
};
exports.AutoCancelTask = AutoCancelTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AutoCancelTask.prototype, "handle", null);
exports.AutoCancelTask = AutoCancelTask = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.Registration)),
    __param(1, (0, sequelize_1.InjectModel)(models_1.Event)),
    __metadata("design:paramtypes", [Object, Object])
], AutoCancelTask);
//# sourceMappingURL=auto-cancel.task.js.map