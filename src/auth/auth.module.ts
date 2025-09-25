import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { HashService } from "./hash/hash.service";
import { BcryptService } from "./hash/bcrypt.service";
import { JwtModule } from "src/config/jwt.module";

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: HashService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashService, JwtModule],
})
export class AuthModule {}
