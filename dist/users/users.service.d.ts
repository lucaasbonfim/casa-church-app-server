import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HashService } from "src/auth/hash/hash.service";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { EmailService } from "src/email/email.service";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
export declare class UsersService {
    private readonly usersRepository;
    private readonly hashService;
    private readonly emailService;
    constructor(usersRepository: UsersRepository, hashService: HashService, emailService: EmailService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: any;
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
        user: import("./entities/user.model").User | null;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
    private createEmailVerificationToken;
    private hashEmailVerificationToken;
    private buildEmailVerificationUrl;
    private sanitizeUser;
}
