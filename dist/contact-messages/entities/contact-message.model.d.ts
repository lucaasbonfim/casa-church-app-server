import { Model } from "sequelize-typescript";
export declare class ContactMessage extends Model {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
