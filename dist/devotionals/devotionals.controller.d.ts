import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { CreateDevotionalDto } from "./dto/create-devotional.dto";
import { FindDevotionalsQueryDto } from "./dto/find-devotionals-query.dto";
import { UpdateDevotionalDto } from "./dto/update-devotional.dto";
import { DevotionalsService } from "./devotionals.service";
export declare class DevotionalsController {
    private readonly devotionalsService;
    constructor(devotionalsService: DevotionalsService);
    create(createDevotionalDto: CreateDevotionalDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        devotional: import("./entities/devotional.model").Devotional;
    }>;
    findAll(findQuery: FindDevotionalsQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        devotionals: import("./entities/devotional.model").Devotional[];
    }>;
    findOne(id: string): Promise<import("./entities/devotional.model").Devotional>;
    update(id: string, updateDevotionalDto: UpdateDevotionalDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        devotional: import("./entities/devotional.model").Devotional;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
