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
exports.ChurchHousesRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const models_1 = require("../models");
let ChurchHousesRepository = class ChurchHousesRepository {
    churchHouseModel;
    constructor(churchHouseModel) {
        this.churchHouseModel = churchHouseModel;
    }
    async create(data) {
        return this.churchHouseModel.create(data);
    }
    async findAll(findQuery) {
        const { page, limit, name, city, uf, active, orderBy, orderDirection } = findQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (name)
            where.name = { [sequelize_2.Op.iLike]: `%${name}%` };
        if (city)
            where.city = { [sequelize_2.Op.iLike]: `%${city}%` };
        if (uf)
            where.uf = { [sequelize_2.Op.iLike]: uf };
        if (active !== undefined)
            where.active = active;
        const { rows, count } = await this.churchHouseModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            churchHouses: rows,
        };
    }
    async findById(id) {
        return this.churchHouseModel.findByPk(id);
    }
    async update(id, data) {
        const churchHouse = await this.findById(id);
        return churchHouse.update(data);
    }
    async delete(id) {
        const churchHouse = await this.findById(id);
        await churchHouse.destroy();
    }
};
exports.ChurchHousesRepository = ChurchHousesRepository;
exports.ChurchHousesRepository = ChurchHousesRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.ChurchHouse)),
    __metadata("design:paramtypes", [Object])
], ChurchHousesRepository);
//# sourceMappingURL=church-houses.repository.js.map