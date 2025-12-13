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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let DonationsRepository = class DonationsRepository {
    donationModel;
    constructor(donationModel) {
        this.donationModel = donationModel;
    }
    async create(data) {
        const createdDonation = await this.donationModel.create(data);
        return createdDonation;
    }
    async findAll(findDonationsQuery) {
        const { page, limit, userId, orderBy, orderDirection } = findDonationsQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (userId)
            where.userId = userId;
        const { rows, count } = await this.donationModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            likes: rows,
        };
    }
    async findById(id) {
        const donation = await this.donationModel.findByPk(id);
        return donation;
    }
    async update(id, data) {
        const donation = await this.findById(id);
        return await donation.update(data);
    }
    async delete(id) {
        const donation = await this.findById(id);
        await donation.destroy();
        return;
    }
};
exports.DonationsRepository = DonationsRepository;
exports.DonationsRepository = DonationsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Donation)),
    __metadata("design:paramtypes", [Object])
], DonationsRepository);
//# sourceMappingURL=donations.repository.js.map