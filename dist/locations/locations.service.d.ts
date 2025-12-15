import { LocationsRepository } from "./locations.repository";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLocationsQueryDto } from "./dto/find-locations-query.dto";
export declare class LocationsService {
    private readonly locationsRepository;
    constructor(locationsRepository: LocationsRepository);
    create(createLocationDto: CreateLocationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        location: import("./entities/location.model").Location;
    }>;
    findAll(findLocationsQuery: FindLocationsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        locations: import("./entities/location.model").Location[];
    }>;
    findOne(id: string): Promise<import("./entities/location.model").Location>;
    update(id: string, updateLocationDto: UpdateLocationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        location: import("./entities/location.model").Location;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
