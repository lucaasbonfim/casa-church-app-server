import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiOperation } from "@nestjs/swagger";
import { ConfirmEmailDto } from "./dto/confirm-email.dto";
import { ResendConfirmationEmailDto } from "./dto/resend-confirmation-email.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Realizar login na plataforma",
  })
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: "Confirmar email do usuario",
  })
  @Post("confirm-email")
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @ApiOperation({
    summary: "Reenviar email de confirmacao",
  })
  @Post("resend-confirmation")
  resendConfirmationEmail(
    @Body() resendConfirmationEmailDto: ResendConfirmationEmailDto,
  ) {
    return this.authService.resendConfirmationEmail(resendConfirmationEmailDto);
  }

  @ApiOperation({
    summary: "Solicitar link de redefinicao de senha",
  })
  @Post("forgot-password")
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({
    summary: "Redefinir senha do usuario",
  })
  @Post("reset-password")
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
