import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { UpdateRegistrationDto } from "./dto/update-registration.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { RegistrationsRepotisory } from "./registrations.repository";
import { FindRegistrationsQueryDto } from "./dto/find-registrations-query.dto";
export declare class RegistrationsService {
    private readonly registrationRepository;
    constructor(registrationRepository: RegistrationsRepotisory);
    create(createRegistrationDto: CreateRegistrationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        registration: import("./entities/registration.model").Registration;
    }>;
    findAll(tokenPayload: TokenPayloadDto, findRegistrationsQuery: FindRegistrationsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        registrations: import("./entities/registration.model").Registration[];
    }>;
    findOne(id: string, tokenPayload: TokenPayloadDto): Promise<import("./entities/registration.model").Registration>;
    update(id: string, updateRegistrationDto: UpdateRegistrationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        registration: import("./entities/registration.model").Registration;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
