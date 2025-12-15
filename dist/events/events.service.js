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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const user_constants_1 = require("../users/user.constants");
const events_repository_1 = require("./events.repository");
const messages_constants_1 = require("../common/constants/messages.constants");
const events_constants_1 = require("./events.constants");
let EventsService = class EventsService {
    eventsRepository;
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async create(createEventDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const eventData = {
            ...createEventDto,
            createdBy: tokenPayload.id,
        };
        const event = await this.eventsRepository.create(eventData);
        return {
            message: events_constants_1.CREATED_EVENT_MESSAGE,
            event,
        };
    }
    async findAll(findEventsQuery) {
        return await this.eventsRepository.findAll(findEventsQuery);
    }
    async findOne(id) {
        const event = await this.eventsRepository.findById(id);
        return event;
    }
    async update(id, updateEventDto, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const event = await this.eventsRepository.findById(id);
        if (!event)
            throw new common_1.NotFoundException(events_constants_1.NOT_FOUND_EVENT_MESSAGE);
        console.log("=== UPDATE EVENT ===");
        console.log("ID:", id);
        console.log("Dados recebidos:", updateEventDto);
        console.log("Evento antes:", event.toJSON());
        const updatedEvent = await this.eventsRepository.update(id, updateEventDto);
        console.log("Evento depois:", updatedEvent.toJSON());
        console.log("===================");
        return {
            message: events_constants_1.UPDATED_EVENT_MESSAGE,
            event: updatedEvent,
        };
    }
    async remove(id, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const event = await this.eventsRepository.findById(id);
        if (!event)
            throw new common_1.NotFoundException(events_constants_1.NOT_FOUND_EVENT_MESSAGE);
        await this.eventsRepository.delete(id);
        return {
            message: events_constants_1.DELETED_EVENT_MESSAGE,
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository])
], EventsService);
//# sourceMappingURL=events.service.js.map