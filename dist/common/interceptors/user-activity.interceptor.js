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
exports.UserActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const user_activity_service_1 = require("../../user-activity/user-activity.service");
const jwt_1 = require("@nestjs/jwt");
let UserActivityInterceptor = class UserActivityInterceptor {
    userActivityService;
    jwtService;
    constructor(userActivityService, jwtService) {
        this.userActivityService = userActivityService;
        this.jwtService = jwtService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        let userId = "anonymous";
        if (authHeader && typeof authHeader === "string") {
            try {
                const token = authHeader.replace("Bearer ", "").trim();
                const decoded = this.jwtService.decode(token);
                if (decoded && decoded.id) {
                    userId = decoded.id;
                }
            }
            catch (err) {
                throw new common_1.UnauthorizedException("Token inválido ou malformado");
            }
        }
        const method = request.method;
        const path = request.route?.path || request.url;
        const body = { ...request.body };
        delete body.password;
        return next.handle().pipe((0, rxjs_1.tap)(async (response) => {
            try {
                await this.userActivityService.logActivity(userId, method, path, null, JSON.stringify({ body, response }));
            }
            catch (err) {
                console.error("Erro ao registrar atividade do usuário:", err);
            }
        }));
    }
};
exports.UserActivityInterceptor = UserActivityInterceptor;
exports.UserActivityInterceptor = UserActivityInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_activity_service_1.UserActivityService,
        jwt_1.JwtService])
], UserActivityInterceptor);
//# sourceMappingURL=user-activity.interceptor.js.map