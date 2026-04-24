import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ConfirmEmailDto } from "./dto/confirm-email.dto";
import { ResendConfirmationEmailDto } from "./dto/resend-confirmation-email.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        id: string;
        token: string;
        name: string;
        email: string;
        profileImage: string | null;
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
}
