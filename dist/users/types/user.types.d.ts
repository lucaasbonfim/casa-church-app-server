export type CreateUser = {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    profileImage?: string | null;
};
export type UpdateUser = {
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string | null;
    role?: UserRoles;
    active?: boolean;
};
export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
