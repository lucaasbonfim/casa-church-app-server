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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const users_repository_1 = require("./users.repository");
const hash_service_1 = require("../auth/hash/hash.service");
const email_service_1 = require("../email/email.service");
const user_constants_1 = require("./user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const user_types_1 = require("./types/user.types");
let UsersService = class UsersService {
    usersRepository;
    hashService;
    emailService;
    constructor(usersRepository, hashService, emailService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
        this.emailService = emailService;
    }
    async create(createUserDto) {
        const userExists = await this.usersRepository.findByEmail(createUserDto.email);
        if (userExists)
            throw new common_1.ConflictException(user_constants_1.CREATE_USER_CONFLICT_MESSAGE);
        const hashPassword = await this.hashService.hash(createUserDto.password);
        const emailVerification = this.createEmailVerificationToken();
        const userData = {
            ...createUserDto,
            password: hashPassword,
            role: user_constants_1.USER_ROLE,
            adminModules: [],
            emailVerified: false,
            emailVerifiedAt: null,
            emailVerificationTokenHash: emailVerification.tokenHash,
            emailVerificationExpiresAt: emailVerification.expiresAt,
        };
        const user = await this.usersRepository.create(userData);
        await this.emailService.sendVerificationEmail({
            to: user.email,
            name: user.name,
            verificationUrl: this.buildEmailVerificationUrl(emailVerification.token),
        });
        return {
            message: user_constants_1.CREATED_USER_MESSAGE,
            user: this.sanitizeUser(user),
        };
    }
    async findAll(findUsersQuery) {
        return await this.usersRepository.findAll(findUsersQuery);
    }
    async findOne(id) {
        const user = await this.usersRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException(user_constants_1.NOT_FOUND_USER_MESSAGE);
        return user;
    }
    async update(id, updateUserDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE && id !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const userExists = await this.usersRepository.findById(id);
        if (!userExists)
            throw new common_1.NotFoundException(user_constants_1.NOT_FOUND_USER_MESSAGE);
        if (updateUserDto.email) {
            const emailExists = await this.usersRepository.findByEmail(updateUserDto.email);
            if (emailExists && emailExists.id !== id)
                throw new common_1.ConflictException(user_constants_1.UPDATE_USER_CONFLICT_MESSAGE);
        }
        const updatePayload = { ...updateUserDto };
        const actorIsAdmin = tokenPayload.role === user_constants_1.USER_ADMIN_ROLE;
        if (!actorIsAdmin) {
            [
                "role",
                "active",
                "emailVerified",
                "emailVerifiedAt",
                "emailVerificationTokenHash",
                "emailVerificationExpiresAt",
                "passwordResetTokenHash",
                "passwordResetExpiresAt",
                "lastLoginAt",
                "adminModules",
            ].forEach((field) => {
                delete updatePayload[field];
            });
        }
        if (updatePayload.password) {
            const passwordHash = await this.hashService.hash(updatePayload.password);
            updatePayload.password = passwordHash;
        }
        if (updatePayload.profileImage !== undefined) {
            const normalizedProfileImage = updatePayload.profileImage.trim();
            updatePayload.profileImage = normalizedProfileImage || null;
        }
        const nextRole = (updatePayload.role || userExists.role);
        if (nextRole !== user_types_1.UserRoles.ADMIN) {
            updatePayload.adminModules = [];
        }
        else {
            if (Array.isArray(updatePayload.adminModules)) {
                updatePayload.adminModules = (0, user_types_1.normalizeAdminModules)(updatePayload.adminModules);
            }
            else if (updatePayload.role === user_types_1.UserRoles.ADMIN && userExists.role !== user_types_1.UserRoles.ADMIN) {
                updatePayload.adminModules = (0, user_types_1.getEffectiveAdminModules)(user_types_1.UserRoles.ADMIN, []);
            }
        }
        const updatedUser = await this.usersRepository.update(id, updatePayload);
        return {
            message: user_constants_1.UPDATED_USER_MESSAGE,
            user: updatedUser,
        };
    }
    async remove(id, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE && id !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const userExists = await this.usersRepository.findById(id);
        if (!userExists)
            throw new common_1.NotFoundException(user_constants_1.NOT_FOUND_USER_MESSAGE);
        await this.usersRepository.delete(id);
        return {
            message: user_constants_1.DELETED_USER_MESSAGE,
        };
    }
    createEmailVerificationToken() {
        const token = (0, crypto_1.randomBytes)(32).toString("hex");
        const tokenHash = this.hashEmailVerificationToken(token);
        const ttlMinutes = Number(process.env.EMAIL_VERIFICATION_TTL_MINUTES) || 1440;
        const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
        return { token, tokenHash, expiresAt };
    }
    hashEmailVerificationToken(token) {
        return (0, crypto_1.createHash)("sha256").update(token).digest("hex");
    }
    buildEmailVerificationUrl(token) {
        const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
        return `${frontendUrl}/confirmar-email?token=${encodeURIComponent(token)}`;
    }
    sanitizeUser(user) {
        const sanitizedUser = user?.get ? user.get({ plain: true }) : { ...user };
        delete sanitizedUser.password;
        delete sanitizedUser.emailVerificationTokenHash;
        delete sanitizedUser.emailVerificationExpiresAt;
        return sanitizedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map