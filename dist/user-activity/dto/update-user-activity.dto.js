"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserActivityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_activity_dto_1 = require("./create-user-activity.dto");
class UpdateUserActivityDto extends (0, swagger_1.PartialType)(create_user_activity_dto_1.CreateUserActivityDto) {
}
exports.UpdateUserActivityDto = UpdateUserActivityDto;
//# sourceMappingURL=update-user-activity.dto.js.map