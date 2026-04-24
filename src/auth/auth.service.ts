import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import { LoginDto } from "./dto/login.dto";
import { UsersRepository } from "src/users/users.repository";
import { HashService } from "./hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { ConfirmEmailDto } from "./dto/confirm-email.dto";
import { ResendConfirmationEmailDto } from "./dto/resend-confirmation-email.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { EmailService } from "src/email/email.service";
import {
  CONFIRMATION_EMAIL_SENT_MESSAGE,
  EMAIL_CONFIRMED_MESSAGE,
  EMAIL_NOT_VERIFIED_MESSAGE,
  INVALID_PASSWORD_RESET_TOKEN_MESSAGE,
  PASSWORD_RESET_EMAIL_SENT_MESSAGE,
  PASSWORD_RESET_SUCCESS_MESSAGE,
  INVALID_EMAIL_CONFIRMATION_TOKEN_MESSAGE,
  UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE,
} from "./auth.constants";
import { getEffectiveAdminModules } from "src/users/types/user.types";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user || !user.active)
      throw new UnauthorizedException(UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);

    const isValidPassword = await this.hashService.compare(
      loginDto.password,
      user.password,
    );
    if (!isValidPassword)
      throw new UnauthorizedException(UNAUTHORIZED_EMAIL_PASSWORD_MESSAGE);

    if (user.emailVerified === false) {
      throw new ForbiddenException(EMAIL_NOT_VERIFIED_MESSAGE);
    }

    await this.usersRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    const adminModules = getEffectiveAdminModules(user.role, user.adminModules);

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminModules,
      },
      {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        expiresIn: Number(process.env.JWT_TTL) || 3600,
      },
    );

    return {
      id: user.id,
      token,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage ?? null,
      role: user.role,
      adminModules,
    };
  }

  async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
    const tokenHash = this.hashEmailVerificationToken(confirmEmailDto.token);
    const user =
      await this.usersRepository.findByEmailVerificationTokenHash(tokenHash);

    if (
      !user ||
      !user.emailVerificationExpiresAt ||
      user.emailVerificationExpiresAt.getTime() < Date.now()
    ) {
      throw new UnauthorizedException(INVALID_EMAIL_CONFIRMATION_TOKEN_MESSAGE);
    }

    await this.usersRepository.update(user.id, {
      emailVerified: true,
      emailVerifiedAt: new Date(),
      emailVerificationTokenHash: null,
      emailVerificationExpiresAt: null,
    });

    return { message: EMAIL_CONFIRMED_MESSAGE };
  }

  async resendConfirmationEmail(
    resendConfirmationEmailDto: ResendConfirmationEmailDto,
  ) {
    const user = await this.usersRepository.findByEmail(
      resendConfirmationEmailDto.email,
    );

    if (!user || !user.active) {
      return { message: CONFIRMATION_EMAIL_SENT_MESSAGE };
    }

    if (user.emailVerified !== false) {
      return { message: "Este email ja foi confirmado." };
    }

    const emailVerification = this.createEmailVerificationToken();
    await this.usersRepository.update(user.id, {
      emailVerificationTokenHash: emailVerification.tokenHash,
      emailVerificationExpiresAt: emailVerification.expiresAt,
    });

    await this.emailService.sendVerificationEmail({
      to: user.email,
      name: user.name,
      verificationUrl: this.buildEmailVerificationUrl(emailVerification.token),
    });

    return { message: CONFIRMATION_EMAIL_SENT_MESSAGE };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersRepository.findByEmail(
      forgotPasswordDto.email,
    );

    if (!user || !user.active) {
      return { message: PASSWORD_RESET_EMAIL_SENT_MESSAGE };
    }

    const passwordReset = this.createPasswordResetToken();
    await this.usersRepository.update(user.id, {
      passwordResetTokenHash: passwordReset.tokenHash,
      passwordResetExpiresAt: passwordReset.expiresAt,
    });

    await this.emailService.sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl: this.buildPasswordResetUrl(passwordReset.token),
    });

    return { message: PASSWORD_RESET_EMAIL_SENT_MESSAGE };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const tokenHash = this.hashPasswordResetToken(resetPasswordDto.token);
    const user =
      await this.usersRepository.findByPasswordResetTokenHash(tokenHash);

    if (
      !user ||
      !user.passwordResetExpiresAt ||
      user.passwordResetExpiresAt.getTime() < Date.now()
    ) {
      throw new UnauthorizedException(INVALID_PASSWORD_RESET_TOKEN_MESSAGE);
    }

    const password = await this.hashService.hash(resetPasswordDto.password);
    await this.usersRepository.update(user.id, {
      password,
      passwordResetTokenHash: null,
      passwordResetExpiresAt: null,
    });

    return { message: PASSWORD_RESET_SUCCESS_MESSAGE };
  }

  private createEmailVerificationToken() {
    const token = randomBytes(32).toString("hex");
    const tokenHash = this.hashEmailVerificationToken(token);
    const ttlMinutes =
      Number(process.env.EMAIL_VERIFICATION_TTL_MINUTES) || 1440;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    return { token, tokenHash, expiresAt };
  }

  private createPasswordResetToken() {
    const token = randomBytes(32).toString("hex");
    const tokenHash = this.hashPasswordResetToken(token);
    const ttlMinutes = Number(process.env.PASSWORD_RESET_TTL_MINUTES) || 30;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    return { token, tokenHash, expiresAt };
  }

  private hashEmailVerificationToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }

  private hashPasswordResetToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }

  private buildEmailVerificationUrl(token: string) {
    const frontendUrl = (
      process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/$/, "");
    return `${frontendUrl}/confirmar-email?token=${encodeURIComponent(token)}`;
  }

  private buildPasswordResetUrl(token: string) {
    const frontendUrl = (
      process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/$/, "");

    return `${frontendUrl}/redefinir-senha?token=${encodeURIComponent(token)}`;
  }
}
