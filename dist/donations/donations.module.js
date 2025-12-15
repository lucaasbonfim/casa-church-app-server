"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const donations_service_1 = require("./donations.service");
const donations_controller_1 = require("./donations.controller");
const donations_repository_1 = require("./donations.repository");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const user_activity_module_1 = require("../user-activity/user-activity.module");
let DonationsModule = class DonationsModule {
};
exports.DonationsModule = DonationsModule;
exports.DonationsModule = DonationsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature(models_1.models), auth_module_1.AuthModule, user_activity_module_1.UserActivityModule],
        controllers: [donations_controller_1.DonationsController],
        providers: [donations_service_1.DonationsService, donations_repository_1.DonationsRepository],
    })
], DonationsModule);
//# sourceMappingURL=donations.module.js.map