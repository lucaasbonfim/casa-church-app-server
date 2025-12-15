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
exports.RegistrationsRepotisory = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let RegistrationsRepotisory = class RegistrationsRepotisory {
    registrationModel;
    eventModel;
    locationModel;
    constructor(registrationModel, eventModel, locationModel) {
        this.registrationModel = registrationModel;
        this.eventModel = eventModel;
        this.locationModel = locationModel;
    }
    async create(data) {
        const createdRegistration = await this.registrationModel.create(data);
        return createdRegistration;
    }
    async findAll(findRegistrationsQuery) {
        const { page, limit, userId, eventId, orderBy, orderDirection } = findRegistrationsQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (userId)
            where.userId = userId;
        if (eventId)
            where.eventId = eventId;
        const { rows, count } = await this.registrationModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            registrations: rows,
        };
    }
    async findById(id) {
        const registration = await this.registrationModel.findByPk(id);
        return registration;
    }
    async findByUserId(userId) {
        const registrations = await this.registrationModel.findAll({
            where: {
                userId,
            },
        });
        return registrations;
    }
    async findByUserAndEvent(userId, eventId) {
        return this.registrationModel.findOne({
            where: { userId, eventId },
        });
    }
    async update(id, data) {
        const registration = await this.findById(id);
        return await registration.update(data);
    }
    async delete(id) {
        const registration = await this.findById(id);
        await registration.destroy();
        return;
    }
    async findEventWithLocation(eventId) {
        return this.eventModel.findByPk(eventId, {
            include: [{ model: this.locationModel }],
        });
    }
    async countActiveByEvent(eventId) {
        return this.registrationModel.count({
            where: {
                eventId,
                status: "confirmed",
            },
        });
    }
};
exports.RegistrationsRepotisory = RegistrationsRepotisory;
exports.RegistrationsRepotisory = RegistrationsRepotisory = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Registration)),
    __param(1, (0, sequelize_1.InjectModel)(models_1.Event)),
    __param(2, (0, sequelize_1.InjectModel)(models_1.Location)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RegistrationsRepotisory);
//# sourceMappingURL=registrations.repository.js.map