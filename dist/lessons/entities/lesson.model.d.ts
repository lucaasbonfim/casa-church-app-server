import { Model } from "sequelize-typescript";
export declare class Lesson extends Model<Lesson> {
    id: string;
    sermonId: string;
    title: string;
    description: string;
    videoLink: string;
    ordem: number;
    createdAt: Date;
    updatedAt: Date;
}
