import { FindQueryDto } from "src/common/dto/find-query.dto";
export declare class FindRegistrationsQueryDto extends FindQueryDto {
    userId?: string;
    eventId?: string;
    status?: string;
}
