import { LoginDto } from "./dto/login.dto";
import { UsersRepository } from "src/users/users.repository";
import { HashService } from "./hash/hash.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly usersRepository;
    private readonly hashService;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, hashService: HashService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}
