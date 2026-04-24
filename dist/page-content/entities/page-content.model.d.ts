import { Model } from "sequelize-typescript";
export declare class PageContent extends Model {
    id: string;
    slug: string;
    content: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
