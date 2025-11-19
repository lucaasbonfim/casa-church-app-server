import { Model } from "sequelize-typescript";
import { User } from "src/models";
export declare class UserActivity extends Model<UserActivity> {
    id: string;
    userId: string;
    user: User;
    action: string;
    endpoint: string;
    description: string;
    createdAt: Date;
}
