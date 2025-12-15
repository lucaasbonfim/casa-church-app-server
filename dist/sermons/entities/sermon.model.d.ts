import { Model } from "sequelize-typescript";
export declare class Sermon extends Model<Sermon> {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
}
