"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsService = void 0;
const common_1 = require("@nestjs/common");
const donation_constants_1 = require("./donation.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const donations_repository_1 = require("./donations.repository");
const user_constants_1 = require("../users/user.constants");
let DonationsService = class DonationsService {
    donationsRepository;
    constructor(donationsRepository) {
        this.donationsRepository = donationsRepository;
    }
    async create(createDonationDto, tokenPayload) {
        const donationData = {
            ...createDonationDto,
        };
        if (createDonationDto.userId !== tokenPayload.id)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        const donation = await this.donationsRepository.create(donationData);
        return {
            message: donation_constants_1.CREATED_DONATION,
            donation,
        };
    }
    async findAll(findDonationsQuery, tokenPayload) {
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        return await this.donationsRepository.findAll(findDonationsQuery);
    }
    async findOne(id, tokenPayload) {
        const donation = await this.donationsRepository.findById(id);
        if (!donation)
            throw new common_1.NotFoundException(donation_constants_1.NOT_FOUND_DONATION);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        return donation;
    }
    async update(id, updateDonationDto, tokenPayload) {
        const donation = await this.donationsRepository.findById(id);
        if (!donation)
            throw new common_1.NotFoundException(donation_constants_1.NOT_FOUND_DONATION);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        const updatedDonation = await this.donationsRepository.update(id, updateDonationDto);
        return {
            message: donation_constants_1.UPDATED_DONATION,
            donation: updatedDonation,
        };
    }
    async remove(id, tokenPayload) {
        const donation = await this.donationsRepository.findById(id);
        if (!donation)
            throw new common_1.NotFoundException(donation_constants_1.NOT_FOUND_DONATION);
        if (tokenPayload.role !== user_constants_1.USER_ADMIN_ROLE) {
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        }
        await this.donationsRepository.delete(id);
        return {
            message: donation_constants_1.DELETED_DONATION,
        };
    }
};
exports.DonationsService = DonationsService;
exports.DonationsService = DonationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [donations_repository_1.DonationsRepository])
], DonationsService);
//# sourceMappingURL=donations.service.js.map