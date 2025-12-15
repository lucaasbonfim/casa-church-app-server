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
exports.SermonsService = void 0;
const common_1 = require("@nestjs/common");
const sermons_repository_1 = require("./sermons.repository");
const user_constants_1 = require("../users/user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const sermons_constants_1 = require("./sermons.constants");
let SermonsService = class SermonsService {
    SermonRepository;
    constructor(SermonRepository) {
        this.SermonRepository = SermonRepository;
    }
    async create(createSermonDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const createdSermon = await this.SermonRepository.create(createSermonDto);
        return {
            message: sermons_constants_1.CREATED_SERMON_MESSAGE,
            sermon: createdSermon,
        };
    }
    async findAll(query) {
        const sermons = await this.SermonRepository.findAll(query);
        return sermons;
    }
    async findOne(id) {
        const sermon = await this.SermonRepository.findById(id);
        if (!sermon) {
            throw new common_1.NotFoundException(sermons_constants_1.NOT_FOUND_SERMON);
        }
        return sermon;
    }
    async update(id, updateSermonDto, tokenPayload) {
        const sermonExists = this.SermonRepository.findById(id);
        if (!sermonExists) {
            throw new common_1.NotFoundException(sermons_constants_1.NOT_FOUND_SERMON);
        }
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const updatedSermon = await this.SermonRepository.update(id, updateSermonDto);
        return {
            message: sermons_constants_1.UPDATED_SERMON_MESSAGE,
            sermon: updatedSermon,
        };
    }
    async remove(id, tokenPayload) {
        const sermonExists = this.SermonRepository.findById(id);
        if (!sermonExists) {
            throw new common_1.NotFoundException(sermons_constants_1.NOT_FOUND_SERMON);
        }
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.SermonRepository.delete(id);
        return {
            message: sermons_constants_1.DELETED_SERMON_MESSAGE,
        };
    }
};
exports.SermonsService = SermonsService;
exports.SermonsService = SermonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sermons_repository_1.SermonsRepository])
], SermonsService);
//# sourceMappingURL=sermons.service.js.map