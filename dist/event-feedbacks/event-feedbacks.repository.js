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
exports.EventFeedbacksRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let EventFeedbacksRepository = class EventFeedbacksRepository {
    eventFeedbackModel;
    constructor(eventFeedbackModel) {
        this.eventFeedbackModel = eventFeedbackModel;
    }
    async create(data) {
        const createdFeedback = await this.eventFeedbackModel.create(data);
        return createdFeedback;
    }
    async findById(id) {
        const eventFeedback = await this.eventFeedbackModel.findByPk(id);
        return eventFeedback;
    }
    async findByUserAndEvent(userId, eventId) {
        const eventFeedback = await this.eventFeedbackModel.findOne({
            where: {
                eventId,
                userId,
            },
        });
        return eventFeedback;
    }
    async findAll(findEventFeedbacksQuery) {
        const { page, limit, eventId, rating, orderBy, orderDirection } = findEventFeedbacksQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (eventId)
            where.eventId = eventId;
        if (rating)
            where.rating = rating;
        const { rows, count } = await this.eventFeedbackModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            feedbacks: rows,
        };
    }
    async delete(id) {
        const feedback = await this.eventFeedbackModel.findByPk(id);
        await feedback.destroy();
        return feedback;
    }
};
exports.EventFeedbacksRepository = EventFeedbacksRepository;
exports.EventFeedbacksRepository = EventFeedbacksRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.EventFeedback)),
    __metadata("design:paramtypes", [Object])
], EventFeedbacksRepository);
//# sourceMappingURL=event-feedbacks.repository.js.map