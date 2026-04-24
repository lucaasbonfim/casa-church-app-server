import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { UpdatePageContentDto } from "./dto/update-page-content.dto";
import { PageContentRepository } from "./page-content.repository";
export declare class PageContentService {
    private readonly pageContentRepository;
    constructor(pageContentRepository: PageContentRepository);
    findBySlug(slug: string): Promise<import("./entities/page-content.model").PageContent>;
    update(slug: string, updatePageContentDto: UpdatePageContentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        pageContent: import("./entities/page-content.model").PageContent;
    }>;
}
