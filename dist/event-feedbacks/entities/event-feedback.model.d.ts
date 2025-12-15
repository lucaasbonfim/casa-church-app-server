import { Model } from "sequelize-typescript";
export declare class EventFeedback extends Model {
    id: string;
    eventId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
