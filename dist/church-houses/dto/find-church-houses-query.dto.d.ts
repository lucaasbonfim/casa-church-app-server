import { FindQueryDto } from "src/common/dto/find-query.dto";
export declare class FindChurchHousesQueryDto extends FindQueryDto {
    name?: string;
    city?: string;
    uf?: string;
    active?: boolean;
}
