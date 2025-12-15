import { Registration, Event, Location } from "src/models";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";
export declare class RegistrationsRepotisory {
    private readonly registrationModel;
    private readonly eventModel;
    private readonly locationModel;
    constructor(registrationModel: typeof Registration, eventModel: typeof Event, locationModel: typeof Location);
    create(data: any): Promise<Registration>;
    findAll(findRegistrationsQuery: FindRegistrationsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        registrations: Registration[];
    }>;
    findById(id: string): Promise<Registration | null>;
    findByUserId(userId: string): Promise<Registration[]>;
    findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;
    update(id: string, data: any): Promise<Registration>;
    delete(id: string): Promise<void>;
    findEventWithLocation(eventId: string): Promise<Event | null>;
    countActiveByEvent(eventId: string): Promise<number>;
}
