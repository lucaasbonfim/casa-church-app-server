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
export declare class EmailService {
    private readonly logger;
    private transporter;
    private getFrontendUrl;
    private getEmailFrom;
    private parseEmailFrom;
    private getBrevoApiKey;
    private getLogoUrl;
    private buildLogoImage;
    private isPublicHttpUrl;
    private getInlineLogoAttachment;
    private getTransporter;
    private sendViaBrevo;
    private trySendViaBrevo;
    private sendViaSmtp;
    private getErrorMessage;
    sendVerificationEmail({ to, name, verificationUrl, }: SendVerificationEmailParams): Promise<{
        sent: boolean;
    }>;
    sendPasswordResetEmail({ to, name, resetUrl, }: SendPasswordResetEmailParams): Promise<{
        sent: boolean;
    }>;
    private buildVerificationTemplate;
    private buildPasswordResetTemplate;
}
export {};
