import { Devotional } from "src/models";
import { FindDevotionalsQueryDto } from "./dto/find-devotionals-query.dto";
import { CreateDevotional, UpdateDevotional } from "./types/devotional.types";
export declare class DevotionalsRepository {
    private readonly devotionalModel;
    constructor(devotionalModel: typeof Devotional);
    create(data: CreateDevotional): Promise<Devotional>;
    findAll(findQuery: FindDevotionalsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        devotionals: Devotional[];
    }>;
    findById(id: string): Promise<Devotional | null>;
    update(id: string, data: UpdateDevotional): Promise<Devotional>;
    delete(id: string): Promise<void>;
}
