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
exports.RegistrationsService = void 0;
const common_1 = require("@nestjs/common");
const registrations_repository_1 = require("./registrations.repository");
const user_constants_1 = require("../users/user.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const registrations_constants_1 = require("./registrations.constants");
let RegistrationsService = class RegistrationsService {
    registrationRepository;
    constructor(registrationRepository) {
        this.registrationRepository = registrationRepository;
    }
    async create(createRegistrationDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            createRegistrationDto.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const existing = await this.registrationRepository.findByUserAndEvent(createRegistrationDto.userId, createRegistrationDto.eventId);
        if (existing)
            throw new common_1.ConflictException(registrations_constants_1.CREATE_REGISTRATION_CONFLICT_MESSAGE);
        const event = await this.registrationRepository.findEventWithLocation(createRegistrationDto.eventId);
        if (!event || !event.locationId) {
            throw new common_1.NotFoundException(registrations_constants_1.EVENT_OR_LOCATION_NOT_FOUND_MESSAGE);
        }
        const currentCount = await this.registrationRepository.countActiveByEvent(createRegistrationDto.eventId);
        if (currentCount >= event.location.capacity) {
            throw new common_1.ConflictException(registrations_constants_1.EVENT_FULL_MESSAGE);
        }
        const createdRegistration = await this.registrationRepository.create(createRegistrationDto);
        return {
            message: registrations_constants_1.CREATED_REGISTRATION_MESSAGE,
            registration: createdRegistration,
        };
    }
    async findAll(tokenPayload, findRegistrationsQuery) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            findRegistrationsQuery.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const registrations = await this.registrationRepository.findAll(findRegistrationsQuery);
        return registrations;
    }
    async findOne(id, tokenPayload) {
        const registration = await this.registrationRepository.findById(id);
        if (!registration) {
            throw new common_1.NotFoundException(registrations_constants_1.NOT_FOUND_REGISTRATION_MESSAGE);
        }
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            registration.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        return registration;
    }
    async update(id, updateRegistrationDto, tokenPayload) {
        const registrationExists = await this.registrationRepository.findById(id);
        if (!registrationExists)
            throw new common_1.NotFoundException(registrations_constants_1.NOT_FOUND_REGISTRATION_MESSAGE);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            registrationExists.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const updatedRegistration = await this.registrationRepository.update(id, updateRegistrationDto);
        return {
            message: registrations_constants_1.UPDATED_REGISTRATION_MESSAGE,
            registration: updatedRegistration,
        };
    }
    async remove(id, tokenPayload) {
        const registrationExists = await this.registrationRepository.findById(id);
        if (!registrationExists)
            throw new common_1.NotFoundException(registrations_constants_1.NOT_FOUND_REGISTRATION_MESSAGE);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE &&
            registrationExists.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.registrationRepository.delete(id);
        return {
            message: registrations_constants_1.CANCEL_REGISTRATION_MESSAGE,
        };
    }
};
exports.RegistrationsService = RegistrationsService;
exports.RegistrationsService = RegistrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [registrations_repository_1.RegistrationsRepotisory])
], RegistrationsService);
//# sourceMappingURL=registrations.service.js.map