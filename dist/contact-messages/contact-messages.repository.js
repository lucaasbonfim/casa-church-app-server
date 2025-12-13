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
exports.ContactMessagesRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let ContactMessagesRepository = class ContactMessagesRepository {
    contactMessageModel;
    constructor(contactMessageModel) {
        this.contactMessageModel = contactMessageModel;
    }
    async create(data) {
        const createdContactMessage = await this.contactMessageModel.create(data);
        return createdContactMessage;
    }
    async findAll(findContactMessagesQuery) {
        const { page, limit, email, orderBy, orderDirection } = findContactMessagesQuery;
        const offset = (page - 1) * limit;
        const where = {};
        if (email)
            where.email = email;
        const { rows, count } = await this.contactMessageModel.findAndCountAll({
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
        const contactMessage = await this.contactMessageModel.findByPk(id);
        return contactMessage;
    }
    async update(id, data) {
        const contactMessage = await this.findById(id);
        return await contactMessage.update(data);
    }
    async delete(id) {
        const contactMessage = await this.findById(id);
        await contactMessage.destroy();
        return;
    }
};
exports.ContactMessagesRepository = ContactMessagesRepository;
exports.ContactMessagesRepository = ContactMessagesRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.ContactMessage)),
    __metadata("design:paramtypes", [Object])
], ContactMessagesRepository);
//# sourceMappingURL=contact-messages.repository.js.map