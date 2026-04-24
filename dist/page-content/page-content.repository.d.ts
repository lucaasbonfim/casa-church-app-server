import { PageContent } from "src/models";
export declare class PageContentRepository {
    private readonly pageContentModel;
    constructor(pageContentModel: typeof PageContent);
    findBySlug(slug: string): Promise<PageContent | null>;
    create(slug: string, content: Record<string, any>): Promise<PageContent>;
    update(slug: string, content: Record<string, any>): Promise<PageContent>;
}
