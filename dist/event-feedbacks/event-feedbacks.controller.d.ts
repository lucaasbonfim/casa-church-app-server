import { EventFeedbacksService } from "./event-feedbacks.service";
import { CreateEventFeedbackDto } from "./dto/create-event-feedback.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";
export declare class EventFeedbacksController {
    private readonly eventFeedbacksService;
    constructor(eventFeedbacksService: EventFeedbacksService);
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
