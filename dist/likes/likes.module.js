"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const likes_controller_1 = require("./likes.controller");
const auth_module_1 = require("../auth/auth.module");
const models_1 = require("../models");
const sequelize_1 = require("@nestjs/sequelize");
const likes_repository_1 = require("./likes.repository");
const posts_module_1 = require("../posts/posts.module");
const users_module_1 = require("../users/users.module");
const user_activity_module_1 = require("../user-activity/user-activity.module");
let LikesModule = class LikesModule {
};
exports.LikesModule = LikesModule;
exports.LikesModule = LikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature(models_1.models),
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            users_module_1.UsersModule,
            user_activity_module_1.UserActivityModule,
        ],
        controllers: [likes_controller_1.LikesController],
        providers: [likes_service_1.LikesService, likes_repository_1.LikesRepository],
    })
], LikesModule);
//# sourceMappingURL=likes.module.js.map