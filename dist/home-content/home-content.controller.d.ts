import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";
import { HomeContentService } from "./home-content.service";
export declare class HomeContentController {
    private readonly homeContentService;
    constructor(homeContentService: HomeContentService);
    findCurrent(): Promise<import("./entities/home-content.model").HomeContent>;
    update(updateHomeContentDto: UpdateHomeContentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        homeContent: import("./entities/home-content.model").HomeContent;
    }>;
}
