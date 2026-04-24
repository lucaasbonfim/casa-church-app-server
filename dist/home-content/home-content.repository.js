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
exports.HomeContentRepository = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let HomeContentRepository = class HomeContentRepository {
    homeContentModel;
    constructor(homeContentModel) {
        this.homeContentModel = homeContentModel;
    }
    async findCurrent() {
        return this.homeContentModel.findOne({
            order: [["createdAt", "ASC"]],
        });
    }
    async create(data) {
        return this.homeContentModel.create(data);
    }
    async update(id, data) {
        const homeContent = await this.homeContentModel.findByPk(id);
        return homeContent.update(data);
    }
};
exports.HomeContentRepository = HomeContentRepository;
exports.HomeContentRepository = HomeContentRepository = __decorate([
    __param(0, (0, sequelize_1.InjectModel)(models_1.HomeContent)),
    __metadata("design:paramtypes", [Object])
], HomeContentRepository);
//# sourceMappingURL=home-content.repository.js.map