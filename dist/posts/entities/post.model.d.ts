import { Model } from "sequelize-typescript";
export declare class Post extends Model<Post> {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
}
