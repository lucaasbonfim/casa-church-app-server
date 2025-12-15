import { Donation } from "src/models";
import { CreateDonation, UpdateDonation } from "./types/donation.types";
import { FindDonationsQueryDto } from "./dto/find-donations-query.dto";
export declare class DonationsRepository {
    private readonly donationModel;
    constructor(donationModel: typeof Donation);
    create(data: CreateDonation): Promise<Donation>;
    findAll(findDonationsQuery: FindDonationsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: Donation[];
    }>;
    findById(id: string): Promise<Donation | null>;
    update(id: string, data: UpdateDonation): Promise<Donation>;
    delete(id: string): Promise<void>;
}
