import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: import("./entities/user.model").User;
    }>;
    findAll(findUsersQuery: FindUsersQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        users: import("./entities/user.model").User[];
    }>;
    findOne(id: string): Promise<import("./entities/user.model").User>;
    update(id: string, updateUserDto: UpdateUserDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        user: import("./entities/user.model").User;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
