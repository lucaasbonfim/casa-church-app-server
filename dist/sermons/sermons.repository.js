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
exports.SermonsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let SermonsRepository = class SermonsRepository {
    sermonModel;
    constructor(sermonModel) {
        this.sermonModel = sermonModel;
    }
    async create(data) {
        const createdSermon = await this.sermonModel.create(data);
        return createdSermon;
    }
    async findAll(findSermonQuery) {
        const { page, limit, userId, orderBy, orderDirection } = findSermonQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (userId)
            where.createdBy = userId;
        const { rows, count } = await this.sermonModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            sermons: rows,
        };
    }
    async findById(id) {
        const sermon = await this.sermonModel.findByPk(id);
        return sermon;
    }
    async update(id, data) {
        const sermon = await this.findById(id);
        return await sermon.update(data);
    }
    async delete(id) {
        const sermon = await this.findById(id);
        await sermon.destroy();
        return;
    }
};
exports.SermonsRepository = SermonsRepository;
exports.SermonsRepository = SermonsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Sermon)),
    __metadata("design:paramtypes", [Object])
], SermonsRepository);
//# sourceMappingURL=sermons.repository.js.map