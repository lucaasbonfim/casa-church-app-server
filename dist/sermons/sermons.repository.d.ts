import { Sermon } from "src/models";
import { FindSermonQueryDto } from "./dto/find-sermon-query.dto";
export declare class SermonsRepository {
    private readonly sermonModel;
    constructor(sermonModel: typeof Sermon);
    create(data: any): Promise<Sermon>;
    findAll(findSermonQuery: FindSermonQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        sermons: Sermon[];
    }>;
    findById(id: string): Promise<Sermon | null>;
    update(id: string, data: any): Promise<Sermon>;
    delete(id: string): Promise<void>;
}
