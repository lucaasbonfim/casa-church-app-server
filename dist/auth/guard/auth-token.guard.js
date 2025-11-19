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
exports.AuthTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth.constants");
const auth_users_service_1 = require("../auth-users.service");
let AuthTokenGuard = class AuthTokenGuard {
    jwtService;
    authUsersService;
    constructor(jwtService, authUsersService) {
        this.jwtService = jwtService;
        this.authUsersService = authUsersService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        if (!token)
            throw new common_1.UnauthorizedException("Falha na autenticação");
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                audience: process.env.JWT_TOKEN_AUDIENCE,
                issuer: process.env.JWT_TOKEN_ISSUER,
            });
            const user = await this.authUsersService.findOne(payload.id);
            if (!user || !user.active) {
                throw new common_1.UnauthorizedException("Usuário não existe mais ou foi desativado");
            }
            req[auth_constants_1.REQUEST_TOKEN_PAYLOAD] = {
                ...payload,
                role: user.role,
                id: user.id,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Token inválido ou expirado");
        }
        return true;
    }
    extractTokenFromHeader(req) {
        const authorization = req.headers?.authorization;
        if (!authorization || typeof authorization !== "string")
            return;
        return authorization.trim();
    }
};
exports.AuthTokenGuard = AuthTokenGuard;
exports.AuthTokenGuard = AuthTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_users_service_1.AuthUsersService])
], AuthTokenGuard);
//# sourceMappingURL=auth-token.guard.js.map