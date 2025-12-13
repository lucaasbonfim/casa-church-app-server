"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSermonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_sermon_dto_1 = require("./create-sermon.dto");
class UpdateSermonDto extends (0, swagger_1.PartialType)(create_sermon_dto_1.CreateSermonDto) {
}
exports.UpdateSermonDto = UpdateSermonDto;
//# sourceMappingURL=update-sermon.dto.js.map