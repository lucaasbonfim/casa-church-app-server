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
    private getLogoUrl;
    private isPublicHttpUrl;
    private getInlineLogoAttachment;
    private getTransporter;
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
