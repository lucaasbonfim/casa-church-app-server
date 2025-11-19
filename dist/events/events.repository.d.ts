import { Event } from "src/models";
import { CreateEvent, UpdateEvent } from "./types/event.types";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";
export declare class EventsRepository {
    private readonly eventModel;
    constructor(eventModel: typeof Event);
    create(data: CreateEvent): Promise<Event>;
    findAll(findEventsQuery: FindEventsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        events: Event[];
    }>;
    findById(id: string): Promise<Event | null>;
    update(id: string, data: UpdateEvent): Promise<Event>;
    delete(id: string): Promise<void>;
}
