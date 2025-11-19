import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        event: import("./entities/event.model").Event;
    }>;
    findAll(findEventsQuery: FindEventsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        events: import("./entities/event.model").Event[];
    }>;
    findOne(id: string): Promise<import("./entities/event.model").Event | null>;
    update(id: string, updateEventDto: UpdateEventDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        event: import("./entities/event.model").Event;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
