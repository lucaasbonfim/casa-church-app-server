export type CreateUser = {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    profileImage?: string | null;
    active?: boolean;
    emailVerified?: boolean;
    emailVerifiedAt?: Date | null;
    emailVerificationTokenHash?: string | null;
    emailVerificationExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
};
export type UpdateUser = {
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string | null;
    role?: UserRoles;
    active?: boolean;
    emailVerified?: boolean;
    emailVerifiedAt?: Date | null;
    emailVerificationTokenHash?: string | null;
    emailVerificationExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
};
export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
