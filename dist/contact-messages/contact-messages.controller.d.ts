import { ContactMessagesService } from "./contact-messages.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
import { UpdateContactMessageDto } from "./dto/update-contact-message.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindContactMessagesQueryDto } from "./dto/find-contact-messages-query.dto";
export declare class ContactMessagesController {
    private readonly contactMessagesService;
    constructor(contactMessagesService: ContactMessagesService);
    create(createContactMessageDto: CreateContactMessageDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        contactMessage: import("./entities/contact-message.model").ContactMessage;
    }>;
    findAll(findContactMessagesQuery: FindContactMessagesQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        likes: import("./entities/contact-message.model").ContactMessage[];
    }>;
    findOne(id: string): Promise<import("./entities/contact-message.model").ContactMessage>;
    update(id: string, updateContactMessageDto: UpdateContactMessageDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        contactMessage: import("./entities/contact-message.model").ContactMessage;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
