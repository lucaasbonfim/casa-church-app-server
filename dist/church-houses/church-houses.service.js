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
exports.ChurchHousesService = void 0;
const common_1 = require("@nestjs/common");
const messages_constants_1 = require("../common/constants/messages.constants");
const user_constants_1 = require("../users/user.constants");
const church_houses_constants_1 = require("./church-houses.constants");
const church_houses_repository_1 = require("./church-houses.repository");
let ChurchHousesService = class ChurchHousesService {
    churchHousesRepository;
    constructor(churchHousesRepository) {
        this.churchHousesRepository = churchHousesRepository;
    }
    async create(createChurchHouseDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const churchHouse = await this.churchHousesRepository.create(createChurchHouseDto);
        return {
            message: church_houses_constants_1.CREATED_CHURCH_HOUSE_MESSAGE,
            churchHouse,
        };
    }
    async findAll(findQuery) {
        return this.churchHousesRepository.findAll(findQuery);
    }
    async findOne(id) {
        const churchHouse = await this.churchHousesRepository.findById(id);
        if (!churchHouse) {
            throw new common_1.NotFoundException(church_houses_constants_1.NOT_FOUND_CHURCH_HOUSE_MESSAGE);
        }
        return churchHouse;
    }
    async update(id, updateChurchHouseDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const churchHouse = await this.churchHousesRepository.findById(id);
        if (!churchHouse) {
            throw new common_1.NotFoundException(church_houses_constants_1.NOT_FOUND_CHURCH_HOUSE_MESSAGE);
        }
        const updatedChurchHouse = await this.churchHousesRepository.update(id, updateChurchHouseDto);
        return {
            message: church_houses_constants_1.UPDATED_CHURCH_HOUSE_MESSAGE,
            churchHouse: updatedChurchHouse,
        };
    }
    async remove(id, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const churchHouse = await this.churchHousesRepository.findById(id);
        if (!churchHouse) {
            throw new common_1.NotFoundException(church_houses_constants_1.NOT_FOUND_CHURCH_HOUSE_MESSAGE);
        }
        await this.churchHousesRepository.delete(id);
        return {
            message: church_houses_constants_1.DELETED_CHURCH_HOUSE_MESSAGE,
        };
    }
};
exports.ChurchHousesService = ChurchHousesService;
exports.ChurchHousesService = ChurchHousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [church_houses_repository_1.ChurchHousesRepository])
], ChurchHousesService);
//# sourceMappingURL=church-houses.service.js.map