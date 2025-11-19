import { Location } from "src/models";
import { FindLocationsQueryDto } from "./dto/find-locations-query.dto";
import { CreateLocation, UpdateLocation } from "./types/locations.types";
export declare class LocationsRepository {
    private readonly locationModel;
    constructor(locationModel: typeof Location);
    create(data: CreateLocation): Promise<Location>;
    findAll(findLocationsQuery: FindLocationsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        locations: Location[];
    }>;
    findById(id: string): Promise<Location | null>;
    update(id: string, data: UpdateLocation): Promise<Location>;
    delete(id: string): Promise<void>;
}
