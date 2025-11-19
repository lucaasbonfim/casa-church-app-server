import { FindQueryDto } from "src/common/dto/find-query.dto";
export declare class FindLocationsQueryDto extends FindQueryDto {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    uf?: string;
}
