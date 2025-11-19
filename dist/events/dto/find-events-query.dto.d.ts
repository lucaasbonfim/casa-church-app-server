import { FindQueryDto } from "src/common/dto/find-query.dto";
export declare class FindEventsQueryDto extends FindQueryDto {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    createdBy?: string;
}
