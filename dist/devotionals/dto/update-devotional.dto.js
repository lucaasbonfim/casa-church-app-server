"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDevotionalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_devotional_dto_1 = require("./create-devotional.dto");
class UpdateDevotionalDto extends (0, mapped_types_1.PartialType)(create_devotional_dto_1.CreateDevotionalDto) {
}
exports.UpdateDevotionalDto = UpdateDevotionalDto;
//# sourceMappingURL=update-devotional.dto.js.map