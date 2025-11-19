"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const schedule_1 = require("@nestjs/schedule");
const registrations_service_1 = require("./registrations.service");
const registrations_controller_1 = require("./registrations.controller");
const registrations_repository_1 = require("./registrations.repository");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const user_activity_module_1 = require("../user-activity/user-activity.module");
const auto_cancel_task_1 = require("./tasks/auto-cancel.task");
let RegistrationsModule = class RegistrationsModule {
};
exports.RegistrationsModule = RegistrationsModule;
exports.RegistrationsModule = RegistrationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature(models_1.models),
            auth_module_1.AuthModule,
            user_activity_module_1.UserActivityModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [registrations_controller_1.RegistrationsController],
        providers: [registrations_service_1.RegistrationsService, registrations_repository_1.RegistrationsRepotisory, auto_cancel_task_1.AutoCancelTask],
    })
], RegistrationsModule);
//# sourceMappingURL=registrations.module.js.map