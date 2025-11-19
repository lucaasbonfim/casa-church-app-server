"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const user_activity_model_1 = require("./entities/user-activity.model");
const user_activity_service_1 = require("./user-activity.service");
const user_activity_repository_1 = require("./user-activity.repository");
const user_activity_controller_1 = require("./user-activity.controller");
let UserActivityModule = class UserActivityModule {
};
exports.UserActivityModule = UserActivityModule;
exports.UserActivityModule = UserActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([user_activity_model_1.UserActivity]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            }),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [user_activity_controller_1.UserActivityController],
        providers: [user_activity_service_1.UserActivityService, user_activity_repository_1.UserActivityRepository],
        exports: [user_activity_service_1.UserActivityService],
    })
], UserActivityModule);
//# sourceMappingURL=user-activity.module.js.map