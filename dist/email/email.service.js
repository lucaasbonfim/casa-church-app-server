"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const nodemailer_1 = require("nodemailer");
const path_1 = require("path");
const INLINE_LOGO_CID = "casa-church-logo";
let EmailService = EmailService_1 = class EmailService {
    logger = new common_1.Logger(EmailService_1.name);
    transporter = null;
    getFrontendUrl() {
        return (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
    }
    getEmailFrom() {
        return (process.env.EMAIL_FROM ||
            `"Casa Church" <${process.env.SMTP_USER || "noreply@casachurch.com"}>`);
    }
    parseEmailFrom(from) {
        const match = String(from || "").match(/^(.+?)\s*<(.+?)>$/);
        if (match) {
            return {
                name: match[1].replace(/^"|"$/g, "").trim() || "Casa Church",
                email: match[2].trim(),
            };
        }
        return {
            name: "Casa Church",
            email: from || "noreply@casachurch.com",
        };
    }
    getBrevoApiKey() {
        return process.env.BREVO_API_KEY || process.env.API_MCP_REVO;
    }
    getLogoUrl(inlineLogo, publicPageUrl) {
        const logoUrl = process.env.EMAIL_LOGO_URL;
        if (logoUrl && this.isPublicHttpUrl(logoUrl))
            return logoUrl;
        if (!inlineLogo) {
            const pageLogoUrl = this.buildPublicLogoUrl(publicPageUrl);
            if (pageLogoUrl)
                return pageLogoUrl;
            const frontendLogoUrl = `${this.getFrontendUrl()}/logo-email.png`;
            return this.isPublicHttpUrl(frontendLogoUrl) ? frontendLogoUrl : "";
        }
        return inlineLogo ? `cid:${INLINE_LOGO_CID}` : "";
    }
    buildPublicLogoUrl(publicPageUrl) {
        if (!publicPageUrl)
            return "";
        try {
            const logoUrl = new URL("/logo-email.png", publicPageUrl).toString();
            return this.isPublicHttpUrl(logoUrl) ? logoUrl : "";
        }
        catch {
            return "";
        }
    }
    buildLogoImage(logoUrl) {
        if (!logoUrl)
            return "";
        return `<img src="${logoUrl}" width="86" alt="Casa Church" style="display:block;border:0;max-width:86px;height:auto;margin:0 auto 22px;" />`;
    }
    isPublicHttpUrl(url) {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase();
            return (["http:", "https:"].includes(parsedUrl.protocol) &&
                !["localhost", "127.0.0.1", "::1"].includes(hostname));
        }
        catch {
            return false;
        }
    }
    getInlineLogoAttachment(inlineLogo) {
        if (!inlineLogo)
            return null;
        const logoUrl = process.env.EMAIL_LOGO_URL;
        if (logoUrl && this.isPublicHttpUrl(logoUrl))
            return null;
        const logoPath = (0, path_1.join)(__dirname, "assets", "logo-email.png");
        if (!(0, fs_1.existsSync)(logoPath)) {
            this.logger.warn(`Logo do email nao encontrada em ${logoPath}`);
            return null;
        }
        return {
            filename: "logo-email.png",
            path: logoPath,
            cid: INLINE_LOGO_CID,
            contentType: "image/png",
            contentDisposition: "inline",
        };
    }
    getTransporter() {
        if (this.transporter)
            return this.transporter;
        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || 587);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (!host || !user || !pass)
            return null;
        this.transporter = (0, nodemailer_1.createTransport)({
            host,
            port,
            secure: process.env.SMTP_SECURE === "true" || port === 465,
            auth: { user, pass },
        });
        return this.transporter;
    }
    async sendViaBrevo({ to, subject, html }) {
        const apiKey = this.getBrevoApiKey();
        if (!apiKey)
            return null;
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: this.parseEmailFrom(this.getEmailFrom()),
                to: [{ email: to }],
                subject,
                htmlContent: html,
            }),
        });
        if (!response.ok) {
            const body = await response.text().catch(() => "");
            throw new Error(`Brevo API ${response.status}${body ? `: ${body}` : ""}`);
        }
        const data = (await response.json().catch(() => ({})));
        this.logger.log(`Email enviado via Brevo para ${to}${data.messageId ? ` (messageId: ${data.messageId})` : ""}`);
        return { sent: true };
    }
    async trySendViaBrevo(params) {
        try {
            const result = await this.sendViaBrevo(params);
            if (result)
                return true;
        }
        catch (error) {
            this.logger.error(`Brevo API falhou: ${this.getErrorMessage(error)}`);
        }
        return false;
    }
    async sendViaSmtp({ to, subject, html, attachments, }) {
        const transporter = this.getTransporter();
        if (!transporter)
            return null;
        await transporter.sendMail({
            from: this.getEmailFrom(),
            to,
            subject,
            html,
            attachments,
        });
        return { sent: true };
    }
    getErrorMessage(error) {
        return error instanceof Error ? error.message : String(error);
    }
    async sendVerificationEmail({ to, name, verificationUrl, }) {
        const subject = "Confirme seu email - Casa Church";
        const brevoTemplate = this.buildVerificationTemplate({ name, verificationUrl }, { inlineLogo: false });
        if (await this.trySendViaBrevo({
            to,
            subject,
            html: brevoTemplate.html,
        })) {
            return { sent: true };
        }
        const smtpTemplate = this.buildVerificationTemplate({ name, verificationUrl }, { inlineLogo: true });
        const smtpResult = await this.sendViaSmtp({
            to,
            subject,
            html: smtpTemplate.html,
            attachments: smtpTemplate.attachments,
        });
        if (!smtpResult) {
            this.logger.warn(`Email nao configurado. Link de confirmacao para ${to}: ${verificationUrl}`);
            if (process.env.NODE_ENV === "production") {
                throw new common_1.InternalServerErrorException("Servico de email nao configurado.");
            }
            return { sent: false };
        }
        return { sent: true };
    }
    async sendPasswordResetEmail({ to, name, resetUrl, }) {
        const subject = "Redefina sua senha - Casa Church";
        const brevoTemplate = this.buildPasswordResetTemplate({ name, resetUrl }, { inlineLogo: false });
        if (await this.trySendViaBrevo({
            to,
            subject,
            html: brevoTemplate.html,
        })) {
            return { sent: true };
        }
        const smtpTemplate = this.buildPasswordResetTemplate({ name, resetUrl }, { inlineLogo: true });
        const smtpResult = await this.sendViaSmtp({
            to,
            subject,
            html: smtpTemplate.html,
            attachments: smtpTemplate.attachments,
        });
        if (!smtpResult) {
            this.logger.warn(`Email nao configurado. Link de redefinicao de senha para ${to}: ${resetUrl}`);
            if (process.env.NODE_ENV === "production") {
                throw new common_1.InternalServerErrorException("Servico de email nao configurado.");
            }
            return { sent: false };
        }
        return { sent: true };
    }
    buildVerificationTemplate({ name, verificationUrl }, options = { inlineLogo: true }) {
        const logoUrl = this.getLogoUrl(options.inlineLogo, verificationUrl);
        const logoImage = this.buildLogoImage(logoUrl);
        const inlineLogoAttachment = this.getInlineLogoAttachment(options.inlineLogo);
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
                      ${logoImage}
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
    buildPasswordResetTemplate({ name, resetUrl }, options = { inlineLogo: true }) {
        const logoUrl = this.getLogoUrl(options.inlineLogo, resetUrl);
        const logoImage = this.buildLogoImage(logoUrl);
        const inlineLogoAttachment = this.getInlineLogoAttachment(options.inlineLogo);
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
                      ${logoImage}
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map