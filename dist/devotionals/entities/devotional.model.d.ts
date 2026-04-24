import { Model } from "sequelize-typescript";
import { User } from "src/models";
export declare class Devotional extends Model {
    id: string;
    title: string;
    devotionalDate: Date;
    verseReference?: string | null;
    verseText?: string | null;
    content: string;
    imageUrl?: string | null;
    videoUrl?: string | null;
    published: boolean;
    createdBy?: string | null;
    author?: User;
    createdAt: Date;
    updatedAt: Date;
}
