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
const crypto_1 = require("crypto");
const users_repository_1 = require("../users/users.repository");
const hash_service_1 = require("./hash/hash.service");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const auth_constants_1 = require("./auth.constants");
const user_types_1 = require("../users/types/user.types");
let AuthService = class AuthService {
    usersRepository;
    hashService;
    jwtService;
    emailService;
    constructor(usersRepository, hashService, jwtService, emailService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginDto) {
        const user = await this.usersRepository.findByEmail(loginDto.email);
        if (!user || !user.active)
            throw new common_1.UnauthorizedException(auth_constants_1.UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);
        const isValidPassword = await this.hashService.compare(loginDto.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException(auth_constants_1.UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);
        if (user.emailVerified === false) {
            throw new common_1.ForbiddenException(auth_constants_1.EMAIL_NOT_VERIFIED_MESSAGE);
        }
        await this.usersRepository.update(user.id, {
            lastLoginAt: new Date(),
        });
        const adminModules = (0, user_types_1.getEffectiveAdminModules)(user.role, user.adminModules);
        const token = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            adminModules,
        }, {
            secret: process.env.JWT_SECRET,
            audience: process.env.JWT_TOKEN_AUDIENCE,
            issuer: process.env.JWT_TOKEN_ISSUER,
            expiresIn: Number(process.env.JWT_TTL) || 3600,
        });
        return {
            id: user.id,
            token,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage ?? null,
            role: user.role,
            adminModules,
        };
    }
    async confirmEmail(confirmEmailDto) {
        const tokenHash = this.hashEmailVerificationToken(confirmEmailDto.token);
        const user = await this.usersRepository.findByEmailVerificationTokenHash(tokenHash);
        if (!user ||
            !user.emailVerificationExpiresAt ||
            user.emailVerificationExpiresAt.getTime() < Date.now()) {
            throw new common_1.UnauthorizedException(auth_constants_1.INVALID_EMAIL_CONFIRMATION_TOKEN_MESSAGE);
        }
        await this.usersRepository.update(user.id, {
            emailVerified: true,
            emailVerifiedAt: new Date(),
            emailVerificationTokenHash: null,
            emailVerificationExpiresAt: null,
        });
        return { message: auth_constants_1.EMAIL_CONFIRMED_MESSAGE };
    }
    async resendConfirmationEmail(resendConfirmationEmailDto) {
        const user = await this.usersRepository.findByEmail(resendConfirmationEmailDto.email);
        if (!user || !user.active) {
            return { message: auth_constants_1.CONFIRMATION_EMAIL_SENT_MESSAGE };
        }
        if (user.emailVerified !== false) {
            return { message: "Este email ja foi confirmado." };
        }
        const emailVerification = this.createEmailVerificationToken();
        await this.usersRepository.update(user.id, {
            emailVerificationTokenHash: emailVerification.tokenHash,
            emailVerificationExpiresAt: emailVerification.expiresAt,
        });
        await this.emailService.sendVerificationEmail({
            to: user.email,
            name: user.name,
            verificationUrl: this.buildEmailVerificationUrl(emailVerification.token),
        });
        return { message: auth_constants_1.CONFIRMATION_EMAIL_SENT_MESSAGE };
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.usersRepository.findByEmail(forgotPasswordDto.email);
        if (!user || !user.active) {
            return { message: auth_constants_1.PASSWORD_RESET_EMAIL_SENT_MESSAGE };
        }
        const passwordReset = this.createPasswordResetToken();
        await this.usersRepository.update(user.id, {
            passwordResetTokenHash: passwordReset.tokenHash,
            passwordResetExpiresAt: passwordReset.expiresAt,
        });
        await this.emailService.sendPasswordResetEmail({
            to: user.email,
            name: user.name,
            resetUrl: this.buildPasswordResetUrl(passwordReset.token),
        });
        return { message: auth_constants_1.PASSWORD_RESET_EMAIL_SENT_MESSAGE };
    }
    async resetPassword(resetPasswordDto) {
        const tokenHash = this.hashPasswordResetToken(resetPasswordDto.token);
        const user = await this.usersRepository.findByPasswordResetTokenHash(tokenHash);
        if (!user ||
            !user.passwordResetExpiresAt ||
            user.passwordResetExpiresAt.getTime() < Date.now()) {
            throw new common_1.UnauthorizedException(auth_constants_1.INVALID_PASSWORD_RESET_TOKEN_MESSAGE);
        }
        const password = await this.hashService.hash(resetPasswordDto.password);
        await this.usersRepository.update(user.id, {
            password,
            passwordResetTokenHash: null,
            passwordResetExpiresAt: null,
        });
        return { message: auth_constants_1.PASSWORD_RESET_SUCCESS_MESSAGE };
    }
    createEmailVerificationToken() {
        const token = (0, crypto_1.randomBytes)(32).toString("hex");
        const tokenHash = this.hashEmailVerificationToken(token);
        const ttlMinutes = Number(process.env.EMAIL_VERIFICATION_TTL_MINUTES) || 1440;
        const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
        return { token, tokenHash, expiresAt };
    }
    createPasswordResetToken() {
        const token = (0, crypto_1.randomBytes)(32).toString("hex");
        const tokenHash = this.hashPasswordResetToken(token);
        const ttlMinutes = Number(process.env.PASSWORD_RESET_TTL_MINUTES) || 30;
        const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
        return { token, tokenHash, expiresAt };
    }
    hashEmailVerificationToken(token) {
        return (0, crypto_1.createHash)("sha256").update(token).digest("hex");
    }
    hashPasswordResetToken(token) {
        return (0, crypto_1.createHash)("sha256").update(token).digest("hex");
    }
    buildEmailVerificationUrl(token) {
        const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
        return `${frontendUrl}/confirmar-email?token=${encodeURIComponent(token)}`;
    }
    buildPasswordResetUrl(token) {
        const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
        return `${frontendUrl}/redefinir-senha?token=${encodeURIComponent(token)}`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map