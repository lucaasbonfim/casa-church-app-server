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
exports.EventFeedbacksService = void 0;
const common_1 = require("@nestjs/common");
const event_feedbacks_repository_1 = require("./event-feedbacks.repository");
const event_feedbacks_constants_1 = require("./event-feedbacks.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const events_constants_1 = require("../events/events.constants");
const events_repository_1 = require("../events/events.repository");
let EventFeedbacksService = class EventFeedbacksService {
    eventFeedbacksRepository;
    eventRepository;
    constructor(eventFeedbacksRepository, eventRepository) {
        this.eventFeedbacksRepository = eventFeedbacksRepository;
        this.eventRepository = eventRepository;
    }
    async create(createEventFeedbackDto, tokenPayload) {
        const eventExists = await this.eventRepository.findById(createEventFeedbackDto.eventId);
        if (!eventExists)
            throw new common_1.NotFoundException(events_constants_1.NOT_FOUND_EVENT_MESSAGE);
        const feedbackExists = await this.eventFeedbacksRepository.findByUserAndEvent(tokenPayload.id, createEventFeedbackDto.eventId);
        if (feedbackExists)
            throw new common_1.ConflictException(event_feedbacks_constants_1.CREATE_EVENT_FEEDBACK_CONFLICT_MESSAGE);
        const feedbackData = {
            ...createEventFeedbackDto,
            userId: tokenPayload.id,
        };
        const feedback = await this.eventFeedbacksRepository.create(feedbackData);
        return {
            message: event_feedbacks_constants_1.CREATED_EVENT_FEEDBACK_MESSAGE,
            feedback,
        };
    }
    async findAll(findEventFeedbacksQuery) {
        return await this.eventFeedbacksRepository.findAll(findEventFeedbacksQuery);
    }
    async findOne(id) {
        const feedback = await this.eventFeedbacksRepository.findById(id);
        if (!feedback)
            throw new common_1.NotFoundException(event_feedbacks_constants_1.NOT_FOUND_EVENT_FEEDBACK_MESSAGE);
        return feedback;
    }
    async remove(id, tokenPayload) {
        const feedback = await this.eventFeedbacksRepository.findById(id);
        if (!feedback) {
            throw new common_1.NotFoundException(event_feedbacks_constants_1.NOT_FOUND_EVENT_FEEDBACK_MESSAGE);
        }
        if (feedback.userId !== tokenPayload.id) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.eventFeedbacksRepository.delete(id);
        return {
            message: event_feedbacks_constants_1.DELETED_EVENT_FEEDBACK_MESSAGE,
        };
    }
};
exports.EventFeedbacksService = EventFeedbacksService;
exports.EventFeedbacksService = EventFeedbacksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_feedbacks_repository_1.EventFeedbacksRepository,
        events_repository_1.EventsRepository])
], EventFeedbacksService);
//# sourceMappingURL=event-feedbacks.service.js.map