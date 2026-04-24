"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeContentModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const user_activity_module_1 = require("../user-activity/user-activity.module");
const home_content_controller_1 = require("./home-content.controller");
const home_content_repository_1 = require("./home-content.repository");
const home_content_service_1 = require("./home-content.service");
let HomeContentModule = class HomeContentModule {
};
exports.HomeContentModule = HomeContentModule;
exports.HomeContentModule = HomeContentModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature(models_1.models), auth_module_1.AuthModule, user_activity_module_1.UserActivityModule],
        controllers: [home_content_controller_1.HomeContentController],
        providers: [home_content_service_1.HomeContentService, home_content_repository_1.HomeContentRepository],
    })
], HomeContentModule);
//# sourceMappingURL=home-content.module.js.map