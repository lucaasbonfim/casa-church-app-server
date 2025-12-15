export type CreateRegistration = {
    userId: string;
    eventId: string;
};
export type UpdateRegistration = {
    status?: string;
};
export declare enum RegistrationStatus {
    CONFIRMED = "confirmed",
    PENDING = "pending",
    CANCELED = "canceled"
}
