import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { UpdatePageContentDto } from "./dto/update-page-content.dto";
import { PageContentService } from "./page-content.service";
export declare class PageContentController {
    private readonly pageContentService;
    constructor(pageContentService: PageContentService);
    findBySlug(slug: string): Promise<import("./entities/page-content.model").PageContent>;
    update(slug: string, updatePageContentDto: UpdatePageContentDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        pageContent: import("./entities/page-content.model").PageContent;
    }>;
}
