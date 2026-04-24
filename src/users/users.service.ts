import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { HashService } from "src/auth/hash/hash.service";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { EmailService } from "src/email/email.service";
import {
  CREATE_USER_CONFLICT_MESSAGE,
  CREATED_USER_MESSAGE,
  DELETED_USER_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  UPDATE_USER_CONFLICT_MESSAGE,
  UPDATED_USER_MESSAGE,
  USER_ADMIN_ROLE,
  USER_ROLE,
} from "./user.constants";
import { FORBIDDEN_OPERATION_MESSAGE } from "src/common/constants/messages.constants";
import { FindUsersQueryDto } from "./dto/find-users-query.dto";
import {
  getEffectiveAdminModules,
  normalizeAdminModules,
  UserRoles,
} from "./types/user.types";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findByEmail(
      createUserDto.email
    );
    if (userExists) throw new ConflictException(CREATE_USER_CONFLICT_MESSAGE);

    const hashPassword = await this.hashService.hash(createUserDto.password);
    const emailVerification = this.createEmailVerificationToken();
    const userData = {
      ...createUserDto,
      password: hashPassword,
      role: USER_ROLE,
      adminModules: [],
      emailVerified: false,
      emailVerifiedAt: null,
      emailVerificationTokenHash: emailVerification.tokenHash,
      emailVerificationExpiresAt: emailVerification.expiresAt,
    };

    const user = await this.usersRepository.create(userData as any);
    await this.emailService.sendVerificationEmail({
      to: user.email,
      name: user.name,
      verificationUrl: this.buildEmailVerificationUrl(emailVerification.token),
    });

    return {
      message: CREATED_USER_MESSAGE,
      user: this.sanitizeUser(user),
    };
  }

  async findAll(findUsersQuery: FindUsersQueryDto) {
    return await this.usersRepository.findAll(findUsersQuery);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);

    if (updateUserDto.email) {
      const emailExists = await this.usersRepository.findByEmail(
        updateUserDto.email
      );
      if (emailExists && emailExists.id !== id)
        throw new ConflictException(UPDATE_USER_CONFLICT_MESSAGE);
    }

    const updatePayload: any = { ...updateUserDto };
    const actorIsAdmin = tokenPayload.role === USER_ADMIN_ROLE;

    if (!actorIsAdmin) {
      [
        "role",
        "active",
        "emailVerified",
        "emailVerifiedAt",
        "emailVerificationTokenHash",
        "emailVerificationExpiresAt",
        "passwordResetTokenHash",
        "passwordResetExpiresAt",
        "lastLoginAt",
        "adminModules",
      ].forEach((field) => {
        delete updatePayload[field];
      });
    }

    if (updatePayload.password) {
      const passwordHash = await this.hashService.hash(updatePayload.password);
      updatePayload.password = passwordHash;
    }

    if (updatePayload.profileImage !== undefined) {
      const normalizedProfileImage = updatePayload.profileImage.trim();
      updatePayload.profileImage = normalizedProfileImage || null;
    }

    const nextRole = (updatePayload.role || userExists.role) as UserRoles;

    if (nextRole !== UserRoles.ADMIN) {
      updatePayload.adminModules = [];
    } else {
      if (Array.isArray(updatePayload.adminModules)) {
        updatePayload.adminModules = normalizeAdminModules(
          updatePayload.adminModules
        );
      } else if (updatePayload.role === UserRoles.ADMIN && userExists.role !== UserRoles.ADMIN) {
        updatePayload.adminModules = getEffectiveAdminModules(UserRoles.ADMIN, []);
      }
    }

    const updatedUser = await this.usersRepository.update(id, updatePayload);
    return {
      message: UPDATED_USER_MESSAGE,
      user: updatedUser,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    if (tokenPayload.role !== USER_ADMIN_ROLE && id !== tokenPayload.id) {
      throw new ForbiddenException(FORBIDDEN_OPERATION_MESSAGE);
    }

    const userExists = await this.usersRepository.findById(id);
    if (!userExists) throw new NotFoundException(NOT_FOUND_USER_MESSAGE);

    await this.usersRepository.delete(id);
    return {
      message: DELETED_USER_MESSAGE,
    };
  }

  private createEmailVerificationToken() {
    const token = randomBytes(32).toString("hex");
    const tokenHash = this.hashEmailVerificationToken(token);
    const ttlMinutes = Number(process.env.EMAIL_VERIFICATION_TTL_MINUTES) || 1440;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    return { token, tokenHash, expiresAt };
  }

  private hashEmailVerificationToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }

  private buildEmailVerificationUrl(token: string) {
    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(
      /\/$/,
      ""
    );
    return `${frontendUrl}/confirmar-email?token=${encodeURIComponent(token)}`;
  }

  private sanitizeUser(user: any) {
    const sanitizedUser = user?.get ? user.get({ plain: true }) : { ...user };
    delete sanitizedUser.password;
    delete sanitizedUser.emailVerificationTokenHash;
    delete sanitizedUser.emailVerificationExpiresAt;
    return sanitizedUser;
  }
}
