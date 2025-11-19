import { Model } from "sequelize-typescript";
import { PaymentMethods, Status } from "../types/donation.types";
export declare class Donation extends Model {
    id: string;
    userId: string;
    amount: number;
    paymentMethod: PaymentMethods;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}
