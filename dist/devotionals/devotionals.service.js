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
exports.DevotionalsService = void 0;
const common_1 = require("@nestjs/common");
const messages_constants_1 = require("../common/constants/messages.constants");
const user_constants_1 = require("../users/user.constants");
const devotionals_constants_1 = require("./devotionals.constants");
const devotionals_repository_1 = require("./devotionals.repository");
let DevotionalsService = class DevotionalsService {
    devotionalsRepository;
    constructor(devotionalsRepository) {
        this.devotionalsRepository = devotionalsRepository;
    }
    async create(createDevotionalDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const devotional = await this.devotionalsRepository.create({
            ...createDevotionalDto,
            createdBy: tokenPayload.id,
        });
        return {
            message: devotionals_constants_1.CREATED_DEVOTIONAL_MESSAGE,
            devotional,
        };
    }
    async findAll(findQuery) {
        return this.devotionalsRepository.findAll(findQuery);
    }
    async findOne(id) {
        const devotional = await this.devotionalsRepository.findById(id);
        if (!devotional) {
            throw new common_1.NotFoundException(devotionals_constants_1.NOT_FOUND_DEVOTIONAL_MESSAGE);
        }
        return devotional;
    }
    async update(id, updateDevotionalDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const devotional = await this.devotionalsRepository.findById(id);
        if (!devotional) {
            throw new common_1.NotFoundException(devotionals_constants_1.NOT_FOUND_DEVOTIONAL_MESSAGE);
        }
        const updatedDevotional = await this.devotionalsRepository.update(id, updateDevotionalDto);
        return {
            message: devotionals_constants_1.UPDATED_DEVOTIONAL_MESSAGE,
            devotional: updatedDevotional,
        };
    }
    async remove(id, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const devotional = await this.devotionalsRepository.findById(id);
        if (!devotional) {
            throw new common_1.NotFoundException(devotionals_constants_1.NOT_FOUND_DEVOTIONAL_MESSAGE);
        }
        await this.devotionalsRepository.delete(id);
        return {
            message: devotionals_constants_1.DELETED_DEVOTIONAL_MESSAGE,
        };
    }
};
exports.DevotionalsService = DevotionalsService;
exports.DevotionalsService = DevotionalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [devotionals_repository_1.DevotionalsRepository])
], DevotionalsService);
//# sourceMappingURL=devotionals.service.js.map