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
exports.LocationsRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
const sequelize_2 = require("sequelize");
let LocationsRepository = class LocationsRepository {
    locationModel;
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async create(data) {
        const createdLocation = await this.locationModel.create(data);
        return createdLocation;
    }
    async findAll(findLocationsQuery) {
        const { page, limit, name, city, state, uf, orderBy, orderDirection, } = findLocationsQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (name)
            where.name = { [sequelize_2.Op.iLike]: `%${name}%` };
        if (city)
            where.city = { [sequelize_2.Op.iLike]: `%${city}%` };
        if (state)
            where.state = { [sequelize_2.Op.iLike]: `%${state}%` };
        if (uf)
            where.uf = uf;
        const { rows, count } = await this.locationModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            locations: rows,
        };
    }
    async findById(id) {
        const location = await this.locationModel.findByPk(id);
        return location;
    }
    async update(id, data) {
        const location = await this.findById(id);
        return await location.update(data);
    }
    async delete(id) {
        const location = await this.findById(id);
        await location.destroy();
    }
};
exports.LocationsRepository = LocationsRepository;
exports.LocationsRepository = LocationsRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.Location)),
    __metadata("design:paramtypes", [Object])
], LocationsRepository);
//# sourceMappingURL=locations.repository.js.map