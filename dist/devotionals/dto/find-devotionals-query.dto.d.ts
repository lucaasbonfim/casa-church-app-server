import { FindQueryDto } from "src/common/dto/find-query.dto";
export declare class FindDevotionalsQueryDto extends FindQueryDto {
    title?: string;
    date?: Date;
    devotionalDate?: Date;
    startDate?: Date;
    endDate?: Date;
    published?: boolean;
}
