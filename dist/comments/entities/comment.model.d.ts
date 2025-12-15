import { Model } from "sequelize-typescript";
export declare class Comment extends Model {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
