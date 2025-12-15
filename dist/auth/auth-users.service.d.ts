import { UsersRepository } from "src/users/users.repository";
export declare class AuthUsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    findOne(id: string): Promise<import("../models").User | null>;
}
