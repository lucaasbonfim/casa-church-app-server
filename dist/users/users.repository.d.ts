import { User } from "src/models";
import { CreateUser } from "./types/user.types";
import { UpdateUser } from "./types/user.types";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: typeof User);
    create(data: CreateUser): Promise<User>;
    findAll(findUsersQuery: FindUsersQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        users: User[];
    }>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: UpdateUser): Promise<User>;
    delete(id: string): Promise<void>;
}
