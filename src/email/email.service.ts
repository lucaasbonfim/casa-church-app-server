import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { existsSync } from "fs";
import { createTransport, Transporter } from "nodemailer";
import { join } from "path";

type SendVerificationEmailParams = {
  to: string;
  name: string;
  verificationUrl: string;
};

type SendPasswordResetEmailParams = {
  to: string;
  name: string;
  resetUrl: string;
};

const INLINE_LOGO_CID = "casa-church-logo";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter | null = null;

  private getFrontendUrl() {
    return (process.env.FRONTEND_URL || "http://localhost:5173").replace(
      /\/$/,
      "",
    );
  }

  private getLogoUrl() {
    const logoUrl = process.env.EMAIL_LOGO_URL;

    return logoUrl && this.isPublicHttpUrl(logoUrl)
      ? logoUrl
      : `cid:${INLINE_LOGO_CID}`;
  }

  private isPublicHttpUrl(url: string) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();

      return (
        ["http:", "https:"].includes(parsedUrl.protocol) &&
        !["localhost", "127.0.0.1", "::1"].includes(hostname)
      );
    } catch {
      return false;
    }
  }

  private getInlineLogoAttachment() {
    const logoUrl = process.env.EMAIL_LOGO_URL;

    if (logoUrl && this.isPublicHttpUrl(logoUrl)) return null;

    const logoPath = join(__dirname, "assets", "logo-email.png");
    if (!existsSync(logoPath)) {
      this.logger.warn(`Logo do email nao encontrada em ${logoPath}`);
      return null;
    }

    return {
      filename: "logo-email.png",
      path: logoPath,
      cid: INLINE_LOGO_CID,
      contentType: "image/png",
      contentDisposition: "inline" as const,
    };
  }

  private getTransporter() {
    if (this.transporter) return this.transporter;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) return null;

    this.transporter = createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: { user, pass },
    });

    return this.transporter;
  }

  async sendVerificationEmail({
    to,
    name,
    verificationUrl,
  }: SendVerificationEmailParams) {
    const transporter = this.getTransporter();

    if (!transporter) {
      this.logger.warn(
        `SMTP nao configurado. Link de confirmacao para ${to}: ${verificationUrl}`,
      );

      if (process.env.NODE_ENV === "production") {
        throw new InternalServerErrorException(
          "Servico de email nao configurado.",
        );
      }

      return { sent: false };
    }

    const template = this.buildVerificationTemplate({ name, verificationUrl });

    await transporter.sendMail({
      from:
        process.env.EMAIL_FROM || `"Casa Church" <${process.env.SMTP_USER}>`,
      to,
      subject: "Confirme seu email - Casa Church",
      html: template.html,
      attachments: template.attachments,
    });

    return { sent: true };
  }

  async sendPasswordResetEmail({
    to,
    name,
    resetUrl,
  }: SendPasswordResetEmailParams) {
    const transporter = this.getTransporter();

    if (!transporter) {
      this.logger.warn(
        `SMTP nao configurado. Link de redefinicao de senha para ${to}: ${resetUrl}`,
      );

      if (process.env.NODE_ENV === "production") {
        throw new InternalServerErrorException(
          "Servico de email nao configurado.",
        );
      }

      return { sent: false };
    }

    const template = this.buildPasswordResetTemplate({ name, resetUrl });

    await transporter.sendMail({
      from:
        process.env.EMAIL_FROM || `"Casa Church" <${process.env.SMTP_USER}>`,
      to,
      subject: "Redefina sua senha - Casa Church",
      html: template.html,
      attachments: template.attachments,
    });

    return { sent: true };
  }

  private buildVerificationTemplate({
    name,
    verificationUrl,
  }: Omit<SendVerificationEmailParams, "to">) {
    const logoUrl = this.getLogoUrl();
    const inlineLogoAttachment = this.getInlineLogoAttachment();
    const firstName = name?.trim()?.split(/\s+/)[0] || "ola";

    return {
      html: `
      <!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Confirme seu email</title>
        </head>
        <body style="margin:0;background:#0f1115;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0f1115;padding:32px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#151922;border:1px solid rgba(255,255,255,0.12);border-radius:18px;overflow:hidden;">
                  <tr>
                    <td align="center" style="padding:34px 28px 18px;">
                      <img src="${logoUrl}" width="86" alt="Casa Church" style="display:block;border:0;max-width:86px;height:auto;margin:0 auto 22px;" />
                      <p style="margin:0 0 10px;color:#9ca3af;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Casa Church Global</p>
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:800;">Confirme seu email</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 8px;">
                      <p style="margin:0 0 16px;color:#d1d5db;font-size:16px;line-height:1.6;">Oi, ${firstName}.</p>
                      <p style="margin:0;color:#d1d5db;font-size:16px;line-height:1.6;">Recebemos seu cadastro na Casa Church. Para liberar seu acesso, confirme seu email clicando no botao abaixo.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:28px 34px;">
                      <a href="${verificationUrl}" style="display:inline-block;background:#ffffff;color:#0f1115;text-decoration:none;font-size:15px;font-weight:800;padding:14px 24px;border-radius:10px;">Confirmar email</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 30px;">
                      <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">Se o botao nao funcionar, copie e cole este link no navegador:</p>
                      <p style="margin:8px 0 0;color:#e5e7eb;font-size:13px;line-height:1.5;word-break:break-all;">${verificationUrl}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#10141b;border-top:1px solid rgba(255,255,255,0.10);padding:22px 34px;text-align:center;">
                      <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">Voce e bem-vindo a casa.</p>
                      <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">Casa Church Global<br />Este email foi enviado automaticamente.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
      attachments: inlineLogoAttachment ? [inlineLogoAttachment] : [],
    };
  }

  private buildPasswordResetTemplate({
    name,
    resetUrl,
  }: Omit<SendPasswordResetEmailParams, "to">) {
    const logoUrl = this.getLogoUrl();
    const inlineLogoAttachment = this.getInlineLogoAttachment();
    const firstName = name?.trim()?.split(/\s+/)[0] || "ola";

    return {
      html: `
      <!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Redefina sua senha</title>
        </head>
        <body style="margin:0;background:#0f1115;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0f1115;padding:32px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#151922;border:1px solid rgba(255,255,255,0.12);border-radius:18px;overflow:hidden;">
                  <tr>
                    <td align="center" style="padding:34px 28px 18px;">
                      <img src="${logoUrl}" width="86" alt="Casa Church" style="display:block;border:0;max-width:86px;height:auto;margin:0 auto 22px;" />
                      <p style="margin:0 0 10px;color:#9ca3af;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">Casa Church Global</p>
                      <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:800;">Redefina sua senha</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 8px;">
                      <p style="margin:0 0 16px;color:#d1d5db;font-size:16px;line-height:1.6;">Oi, ${firstName}.</p>
                      <p style="margin:0;color:#d1d5db;font-size:16px;line-height:1.6;">Recebemos uma solicitacao para redefinir sua senha. Clique no botao abaixo para criar uma nova senha.</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:28px 34px;">
                      <a href="${resetUrl}" style="display:inline-block;background:#ffffff;color:#0f1115;text-decoration:none;font-size:15px;font-weight:800;padding:14px 24px;border-radius:10px;">Redefinir senha</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 34px 30px;">
                      <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.6;">Se voce nao solicitou isso, ignore este email. Este link expira em breve.</p>
                      <p style="margin:14px 0 0;color:#9ca3af;font-size:13px;line-height:1.6;">Se o botao nao funcionar, copie e cole este link no navegador:</p>
                      <p style="margin:8px 0 0;color:#e5e7eb;font-size:13px;line-height:1.5;word-break:break-all;">${resetUrl}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#10141b;border-top:1px solid rgba(255,255,255,0.10);padding:22px 34px;text-align:center;">
                      <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:700;">Casa Church Global</p>
                      <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.5;">Este email foi enviado automaticamente.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
      attachments: inlineLogoAttachment ? [inlineLogoAttachment] : [],
    };
  }
}
