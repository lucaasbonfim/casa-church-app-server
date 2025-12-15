import { UserRoles } from "../types/user.types";
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
}
