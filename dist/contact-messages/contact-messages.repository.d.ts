import { ContactMessage } from "src/models";
import { CreateContactMessage, UpdateContactMessage } from "./types/contact-message.types";
import { FindContactMessagesQueryDto } from "./dto/find-contact-messages-query.dto";
export declare class ContactMessagesRepository {
    private readonly contactMessageModel;
    constructor(contactMessageModel: typeof ContactMessage);
    create(data: CreateContactMessage): Promise<ContactMessage>;
    findAll(findContactMessagesQuery: FindContactMessagesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: ContactMessage[];
    }>;
    findById(id: string): Promise<ContactMessage | null>;
    update(id: string, data: UpdateContactMessage): Promise<ContactMessage>;
    delete(id: string): Promise<void>;
}
