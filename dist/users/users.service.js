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
const users_repository_1 = require("./users.repository");
const hash_service_1 = require("../auth/hash/hash.service");
const user_constants_1 = require("./user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
let UsersService = class UsersService {
    usersRepository;
    hashService;
    constructor(usersRepository, hashService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
    async create(createUserDto) {
        const userExists = await this.usersRepository.findByEmail(createUserDto.email);
        if (userExists)
            throw new common_1.ConflictException(user_constants_1.CREATE_USER_CONFLICT_MESSAGE);
        const hashPassword = await this.hashService.hash(createUserDto.password);
        const userData = {
            ...createUserDto,
            password: hashPassword,
            role: user_constants_1.USER_ROLE,
        };
        const user = await this.usersRepository.create(userData);
        return {
            message: user_constants_1.CREATED_USER_MESSAGE,
            user,
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
            if (emailExists)
                throw new common_1.ConflictException(user_constants_1.UPDATE_USER_CONFLICT_MESSAGE);
        }
        if (updateUserDto.password) {
            const passwordHash = await this.hashService.hash(updateUserDto.password);
            updateUserDto.password = passwordHash;
        }
        const updatedUser = await this.usersRepository.update(id, updateUserDto);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService])
], UsersService);
//# sourceMappingURL=users.service.js.map