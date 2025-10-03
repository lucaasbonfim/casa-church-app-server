import { InjectModel } from "@nestjs/sequelize";
import { ContactMessage } from "src/models";
import { CreateContactMessage, UpdateContactMessage } from "./types/contact-message.types";

export class ContactMessagesRepository {
    constructor(
        @InjectModel(ContactMessage)
        private readonly contactMessageModel: typeof ContactMessage
    ) {}

    async create(data: CreateContactMessage) {
        const createdContactMessage = await this.contactMessageModel.create(data);

        return createdContactMessage;
    }

    async findAll() {
        return await this.contactMessageModel.findAll();
    }

    async findById(id: string) {
        const contactMessage = await this.contactMessageModel.findByPk(id);

        return contactMessage;
    }

    async update(id: string, data: UpdateContactMessage) {
        const contactMessage = await this.findById(id);

        return await contactMessage!.update(data);
    }

    async delete(id: string) {
        const contactMessage = await this.findById(id);
        await contactMessage!.destroy();

        return;
    }
}