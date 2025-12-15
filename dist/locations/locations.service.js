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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const locations_repository_1 = require("./locations.repository");
const user_constants_1 = require("../users/user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const locations_contants_1 = require("./locations.contants");
let LocationsService = class LocationsService {
    locationsRepository;
    constructor(locationsRepository) {
        this.locationsRepository = locationsRepository;
    }
    async create(createLocationDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const locationData = {
            ...createLocationDto,
        };
        const location = await this.locationsRepository.create(locationData);
        return {
            message: locations_contants_1.CREATED_LOCATION_MESSAGE,
            location,
        };
    }
    async findAll(findLocationsQuery) {
        return await this.locationsRepository.findAll(findLocationsQuery);
    }
    async findOne(id) {
        const location = await this.locationsRepository.findById(id);
        if (!location)
            throw new common_1.NotFoundException(locations_contants_1.NOT_FOUND_LOCATION_MESSAGE);
        return location;
    }
    async update(id, updateLocationDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const location = await this.locationsRepository.findById(id);
        if (!location)
            throw new common_1.NotFoundException(locations_contants_1.NOT_FOUND_LOCATION_MESSAGE);
        const updatedLocation = await this.locationsRepository.update(id, updateLocationDto);
        return {
            message: locations_contants_1.UPDATED_LOCATION_MESSAGE,
            location: updatedLocation,
        };
    }
    async remove(id, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const location = await this.locationsRepository.findById(id);
        if (!location)
            throw new common_1.NotFoundException(locations_contants_1.NOT_FOUND_LOCATION_MESSAGE);
        await this.locationsRepository.delete(id);
        return {
            message: locations_contants_1.DELETED_LOCATION_MESSAGE,
        };
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [locations_repository_1.LocationsRepository])
], LocationsService);
//# sourceMappingURL=locations.service.js.map