"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonProgressModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_progress_service_1 = require("./lesson-progress.service");
const lesson_progress_controller_1 = require("./lesson-progress.controller");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const lesson_progress_repository_1 = require("./lesson-progress.repository");
const user_activity_module_1 = require("../user-activity/user-activity.module");
let LessonProgressModule = class LessonProgressModule {
};
exports.LessonProgressModule = LessonProgressModule;
exports.LessonProgressModule = LessonProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature(models_1.models), auth_module_1.AuthModule, user_activity_module_1.UserActivityModule],
        controllers: [lesson_progress_controller_1.LessonProgressController],
        providers: [lesson_progress_service_1.LessonProgressService, lesson_progress_repository_1.LessonProgressRepository],
    })
], LessonProgressModule);
//# sourceMappingURL=lesson-progress.module.js.map