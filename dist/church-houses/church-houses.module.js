"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChurchHousesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const user_activity_module_1 = require("../user-activity/user-activity.module");
const church_houses_controller_1 = require("./church-houses.controller");
const church_houses_repository_1 = require("./church-houses.repository");
const church_houses_service_1 = require("./church-houses.service");
let ChurchHousesModule = class ChurchHousesModule {
};
exports.ChurchHousesModule = ChurchHousesModule;
exports.ChurchHousesModule = ChurchHousesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature(models_1.models), auth_module_1.AuthModule, user_activity_module_1.UserActivityModule],
        controllers: [church_houses_controller_1.ChurchHousesController],
        providers: [church_houses_service_1.ChurchHousesService, church_houses_repository_1.ChurchHousesRepository],
    })
], ChurchHousesModule);
//# sourceMappingURL=church-houses.module.js.map