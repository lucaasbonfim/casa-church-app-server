import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";
import { HomeContentRepository } from "./home-content.repository";
export declare class HomeContentService {
    private readonly homeContentRepository;
    constructor(homeContentRepository: HomeContentRepository);
    private getDefaultHomeContent;
    findCurrent(): Promise<import("./entities/home-content.model").HomeContent>;
    update(updateHomeContentDto: UpdateHomeContentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        homeContent: import("./entities/home-content.model").HomeContent;
    }>;
}
