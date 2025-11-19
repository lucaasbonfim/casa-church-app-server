export type CreateUser = {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
};
export type UpdateUser = {
    name?: string;
    email?: string;
    password?: string;
    role?: UserRoles;
    active?: boolean;
};
export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
