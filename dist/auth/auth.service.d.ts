import { LoginDto } from "./dto/login.dto";
import { UsersRepository } from "src/users/users.repository";
import { HashService } from "./hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { ConfirmEmailDto } from "./dto/confirm-email.dto";
import { ResendConfirmationEmailDto } from "./dto/resend-confirmation-email.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { EmailService } from "src/email/email.service";
export declare class AuthService {
    private readonly usersRepository;
    private readonly hashService;
    private readonly jwtService;
    private readonly emailService;
    constructor(usersRepository: UsersRepository, hashService: HashService, jwtService: JwtService, emailService: EmailService);
    login(loginDto: LoginDto): Promise<{
        id: string;
        token: string;
        name: string;
        email: string;
        profileImage: string | null;
        role: import("src/users/types/user.types").UserRoles;
        adminModules: string[];
    }>;
    confirmEmail(confirmEmailDto: ConfirmEmailDto): Promise<{
        message: string;
    }>;
    resendConfirmationEmail(resendConfirmationEmailDto: ResendConfirmationEmailDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private createEmailVerificationToken;
    private createPasswordResetToken;
    private hashEmailVerificationToken;
    private hashPasswordResetToken;
    private buildEmailVerificationUrl;
    private buildPasswordResetUrl;
}
