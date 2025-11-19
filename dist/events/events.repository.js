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
exports.EventsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
const sequelize_2 = require("sequelize");
let EventsRepository = class EventsRepository {
    eventModel;
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async create(data) {
        const createdEvent = await this.eventModel.create(data);
        return createdEvent;
    }
    async findAll(findEventsQuery) {
        const { page, limit, title, startDate, endDate, createdBy, orderBy, orderDirection, } = findEventsQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (title)
            where.title = { [sequelize_2.Op.iLike]: `%${title}%` };
        if (createdBy)
            where.createdBy = createdBy;
        if (startDate && endDate) {
            where.startDate = { [sequelize_2.Op.between]: [startDate, endDate] };
        }
        else if (startDate) {
            where.startDate = { [sequelize_2.Op.gte]: startDate };
        }
        else if (endDate) {
            where.startDate = { [sequelize_2.Op.lte]: endDate };
        }
        const { rows, count } = await this.eventModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            events: rows,
        };
    }
    async findById(id) {
        const event = await this.eventModel.findByPk(id);
        return event;
    }
    async update(id, data) {
        const event = await this.findById(id);
        return await event.update(data);
    }
    async delete(id) {
        const event = await this.findById(id);
        await event.destroy();
        return;
    }
};
exports.EventsRepository = EventsRepository;
exports.EventsRepository = EventsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Event)),
    __metadata("design:paramtypes", [Object])
], EventsRepository);
//# sourceMappingURL=events.repository.js.map