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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessagesService = void 0;
const common_1 = require("@nestjs/common");
const contact_messages_constants_1 = require("./contact-messages.constants");
const messages_constants_1 = require("../common/constants/messages.constants");
const contact_messages_repository_1 = require("./contact-messages.repository");
let ContactMessagesService = class ContactMessagesService {
    contactMessagesRepository;
    constructor(contactMessagesRepository) {
        this.contactMessagesRepository = contactMessagesRepository;
    }
    async create(createContactMessageDto, tokenPayload) {
        const contactMessageData = {
            ...createContactMessageDto,
        };
        if (createContactMessageDto.email !== tokenPayload.email)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        const contactMessage = await this.contactMessagesRepository.create(contactMessageData);
        return {
            message: contact_messages_constants_1.CREATED_CONTACT_MESSAGE,
            contactMessage,
        };
    }
    async findAll(findContactMessagesQuery) {
        return await this.contactMessagesRepository.findAll(findContactMessagesQuery);
    }
    async findOne(id) {
        const contactMessage = await this.contactMessagesRepository.findById(id);
        if (!contactMessage)
            throw new common_1.NotFoundException(contact_messages_constants_1.NOT_FOUND_CONTACT_MESSAGE);
        return contactMessage;
    }
    async update(id, updateContactMessageDto, tokenPayload) {
        const contactMessage = await this.contactMessagesRepository.findById(id);
        if (!contactMessage)
            throw new common_1.NotFoundException(contact_messages_constants_1.NOT_FOUND_CONTACT_MESSAGE);
        if (contactMessage.email !== tokenPayload.email)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        const updatedContactMessage = await this.contactMessagesRepository.update(id, updateContactMessageDto);
        return {
            message: contact_messages_constants_1.UPDATED_CONTACT_MESSAGE,
            contactMessage: updatedContactMessage,
        };
    }
    async remove(id, tokenPayload) {
        const contactMessage = await this.contactMessagesRepository.findById(id);
        if (!contactMessage)
            throw new common_1.NotFoundException(contact_messages_constants_1.NOT_FOUND_CONTACT_MESSAGE);
        if (contactMessage.email !== tokenPayload.email)
            throw new common_1.ForbiddenException(messages_constants_1.FORBIDDEN_OPERATION_MESSAGE);
        await this.contactMessagesRepository.delete(id);
        return {
            message: contact_messages_constants_1.DELETED_CONTACT_MESSAGE,
        };
    }
};
exports.ContactMessagesService = ContactMessagesService;
exports.ContactMessagesService = ContactMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contact_messages_repository_1.ContactMessagesRepository])
], ContactMessagesService);
//# sourceMappingURL=contact-messages.service.js.map