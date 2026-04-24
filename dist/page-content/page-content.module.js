"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContentModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const page_content_model_1 = require("./entities/page-content.model");
const page_content_controller_1 = require("./page-content.controller");
const page_content_repository_1 = require("./page-content.repository");
const page_content_service_1 = require("./page-content.service");
const auth_module_1 = require("../auth/auth.module");
const user_activity_module_1 = require("../user-activity/user-activity.module");
let PageContentModule = class PageContentModule {
};
exports.PageContentModule = PageContentModule;
exports.PageContentModule = PageContentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([page_content_model_1.PageContent]),
            auth_module_1.AuthModule,
            user_activity_module_1.UserActivityModule,
        ],
        controllers: [page_content_controller_1.PageContentController],
        providers: [page_content_service_1.PageContentService, page_content_repository_1.PageContentRepository],
    })
], PageContentModule);
//# sourceMappingURL=page-content.module.js.map