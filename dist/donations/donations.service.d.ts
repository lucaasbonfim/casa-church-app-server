import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindDonationsQueryDto } from './dto/find-donations-query.dto';
export declare class DonationsService {
    private readonly donationsRepository;
    constructor(donationsRepository: DonationsRepository);
    create(createDonationDto: CreateDonationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        donation: import("./entities/donation.model").Donation;
    }>;
    findAll(findDonationsQuery: FindDonationsQueryDto, tokenPayload: TokenPayloadDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: import("./entities/donation.model").Donation[];
    }>;
    findOne(id: string, tokenPayload: TokenPayloadDto): Promise<import("./entities/donation.model").Donation>;
    update(id: string, updateDonationDto: UpdateDonationDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        donation: import("./entities/donation.model").Donation;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
