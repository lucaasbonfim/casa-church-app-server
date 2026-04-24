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
exports.DevotionalsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const models_1 = require("../models");
function getDayRange(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return [start, end];
}
let DevotionalsRepository = class DevotionalsRepository {
    devotionalModel;
    constructor(devotionalModel) {
        this.devotionalModel = devotionalModel;
    }
    async create(data) {
        return this.devotionalModel.create(data);
    }
    async findAll(findQuery) {
        const { page, limit, title, date, devotionalDate, startDate, endDate, published, orderBy, orderDirection, } = findQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (title)
            where.title = { [sequelize_2.Op.iLike]: `%${title}%` };
        if (published !== undefined)
            where.published = published;
        const exactDate = devotionalDate || date;
        if (exactDate) {
            where.devotionalDate = { [sequelize_2.Op.between]: getDayRange(exactDate) };
        }
        else if (startDate && endDate) {
            const [start] = getDayRange(startDate);
            const [, end] = getDayRange(endDate);
            where.devotionalDate = { [sequelize_2.Op.between]: [start, end] };
        }
        else if (startDate) {
            const [start] = getDayRange(startDate);
            where.devotionalDate = { [sequelize_2.Op.gte]: start };
        }
        else if (endDate) {
            const [, end] = getDayRange(endDate);
            where.devotionalDate = { [sequelize_2.Op.lte]: end };
        }
        const { rows, count } = await this.devotionalModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            devotionals: rows,
        };
    }
    async findById(id) {
        return this.devotionalModel.findByPk(id);
    }
    async update(id, data) {
        const devotional = await this.findById(id);
        return devotional.update(data);
    }
    async delete(id) {
        const devotional = await this.findById(id);
        await devotional.destroy();
    }
};
exports.DevotionalsRepository = DevotionalsRepository;
exports.DevotionalsRepository = DevotionalsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Devotional)),
    __metadata("design:paramtypes", [Object])
], DevotionalsRepository);
//# sourceMappingURL=devotionals.repository.js.map