import { HomeContent } from "src/models";
import { UpdateHomeContentDto } from "./dto/update-home-content.dto";
export declare class HomeContentRepository {
    private readonly homeContentModel;
    constructor(homeContentModel: typeof HomeContent);
    findCurrent(): Promise<HomeContent | null>;
    create(data: Partial<HomeContent>): Promise<HomeContent>;
    update(id: string, data: UpdateHomeContentDto): Promise<HomeContent>;
}
