import { Model } from "sequelize-typescript";
import { UserRoles } from "../types/user.types";
export declare class User extends Model {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
