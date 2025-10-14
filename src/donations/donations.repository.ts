import { InjectModel } from "@nestjs/sequelize";
import { Donation } from "src/models";
import { CreateDonation, UpdateDonation } from "./types/donation.types";

export class DonationsRepository {
    constructor(
        @InjectModel(Donation)
        private readonly donationModel: typeof Donation
    ) {}

    async create(data: CreateDonation) {
        const createdDonation = await this.donationModel.create(data);

        return createdDonation;
    }

    async findAll() {
        return await this.donationModel.findAll();
    }

    async findById(id: string) {
        const donation = await this.donationModel.findByPk(id);

        return donation;
    }

    async findByUserId(userId: string) {
        return await this.donationModel.findAll({ where: { userId } });
    }

    async update(id: string, data: UpdateDonation) {
        const donation = await this.findById(id);

        return await donation!.update(data);
    }

    async delete(id: string) {
        const donation = await this.findById(id);
        await donation!.destroy();

        return;
    }
}