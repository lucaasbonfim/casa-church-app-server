"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_contact_message_dto_1 = require("./create-contact-message.dto");
class UpdateContactMessageDto extends (0, swagger_1.PartialType)(create_contact_message_dto_1.CreateContactMessageDto) {
}
exports.UpdateContactMessageDto = UpdateContactMessageDto;
//# sourceMappingURL=update-contact-message.dto.js.map