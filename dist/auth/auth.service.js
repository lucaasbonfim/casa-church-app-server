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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const common_2 = require("@nestjs/common");
const hash_service_1 = require("./hash/hash.service");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./auth.constants");
let AuthService = class AuthService {
    usersRepository;
    hashService;
    jwtService;
    constructor(usersRepository, hashService, jwtService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.usersRepository.findByEmail(loginDto.email);
        if (!user || !user.active)
            throw new common_2.UnauthorizedException(auth_constants_1.UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);
        const isValidPassword = await this.hashService.compare(loginDto.password, user.password);
        if (!isValidPassword)
            throw new common_2.UnauthorizedException(auth_constants_1.UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);
        const token = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }, {
            secret: process.env.JWT_SECRET,
            audience: process.env.JWT_TOKEN_AUDIENCE,
            issuer: process.env.JWT_TOKEN_ISSUER,
            expiresIn: Number(process.env.JWT_TTL) || 3600,
        });
        return {
            token,
            name: user.name,
            email: user.email,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map