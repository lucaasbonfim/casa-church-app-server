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
exports.UsersRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
const sequelize_2 = require("sequelize");
let UsersRepository = class UsersRepository {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(data) {
        const createdUser = await this.userModel.create(data);
        return createdUser;
    }
    async findAll(findUsersQuery) {
        const { page, limit, name, orderBy, orderDirection } = findUsersQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (name)
            where.name = { [sequelize_2.Op.iLike]: `${name}%` };
        const { rows, count } = await this.userModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [[orderBy, orderDirection]],
            attributes: { exclude: ["password"] },
        });
        return {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            users: rows,
        };
    }
    async findById(id) {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({
            where: {
                email,
            },
        });
        return user;
    }
    async update(id, data) {
        const user = await this.findById(id);
        return await user.update(data);
    }
    async delete(id) {
        const user = await this.findById(id);
        await user.destroy();
        return;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map