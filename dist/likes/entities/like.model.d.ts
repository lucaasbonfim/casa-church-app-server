import { Model } from "sequelize-typescript";
export declare class Like extends Model {
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
}
