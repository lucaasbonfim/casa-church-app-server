import { SermonsService } from "./sermons.service";
import { CreateSermonDto } from "./dto/create-sermon.dto";
import { UpdateSermonDto } from "./dto/update-sermon.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindSermonQueryDto } from "./dto/find-sermon-query.dto";
export declare class SermonsController {
    private readonly sermonsService;
    constructor(sermonsService: SermonsService);
    create(createSermonDto: CreateSermonDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        sermon: import("./entities/sermon.model").Sermon;
    }>;
    findAll(findSermonQueryDto: FindSermonQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        sermons: import("./entities/sermon.model").Sermon[];
    }>;
    findOne(id: string): Promise<import("./entities/sermon.model").Sermon>;
    update(id: string, updateSermonDto: UpdateSermonDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        sermon: import("./entities/sermon.model").Sermon;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
