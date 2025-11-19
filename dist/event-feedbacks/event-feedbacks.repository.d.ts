import { EventFeedback } from "src/models";
import { FindEventFeedbacksQueryDto } from "./dto/find-event-feedbacks-query.dto";
export declare class EventFeedbacksRepository {
    private readonly eventFeedbackModel;
    constructor(eventFeedbackModel: typeof EventFeedback);
    create(data: any): Promise<EventFeedback>;
    findById(id: string): Promise<EventFeedback | null>;
    findByUserAndEvent(userId: string, eventId: string): Promise<EventFeedback | null>;
    findAll(findEventFeedbacksQuery: FindEventFeedbacksQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        feedbacks: EventFeedback[];
    }>;
    delete(id: string): Promise<EventFeedback | null>;
}
