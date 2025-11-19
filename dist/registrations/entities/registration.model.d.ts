import { Model } from "sequelize-typescript";
import { RegistrationStatus } from "../types/registration.types";
export declare class Registration extends Model<Registration> {
    id: string;
    userId: string;
    eventId: string;
    status: RegistrationStatus;
    createdAt: Date;
    updatedAt: Date;
}
