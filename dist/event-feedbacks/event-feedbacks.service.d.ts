import { EventFeedbacksRepository } from "./event-feedbacks.repository";
import { CreateEventFeedbackDto } from "./dto/create-event-feedback.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";
import { EventsRepository } from "src/events/events.repository";
export declare class EventFeedbacksService {
    private readonly eventFeedbacksRepository;
    private readonly eventRepository;
    constructor(eventFeedbacksRepository: EventFeedbacksRepository, eventRepository: EventsRepository);
    create(createEventFeedbackDto: CreateEventFeedbackDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        feedback: import("./entities/event-feedback.model").EventFeedback;
    }>;
    findAll(findEventFeedbacksQuery: FindEventFeedbacksQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        feedbacks: import("./entities/event-feedback.model").EventFeedback[];
    }>;
    findOne(id: string): Promise<import("./entities/event-feedback.model").EventFeedback>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
