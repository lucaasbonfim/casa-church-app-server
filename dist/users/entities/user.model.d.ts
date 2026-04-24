import { Model } from "sequelize-typescript";
import { UserRoles } from "../types/user.types";
export declare class User extends Model {
    id: string;
    name: string;
    email: string;
    password: string;
    profileImage?: string | null;
    role: UserRoles;
    active: boolean;
    emailVerified: boolean;
    emailVerifiedAt?: Date | null;
    emailVerificationTokenHash?: string | null;
    emailVerificationExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
