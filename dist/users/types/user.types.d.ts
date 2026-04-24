export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
export declare const ADMIN_FULL_ACCESS = "*";
export declare enum AdminModules {
    DASHBOARD = "dashboard",
    HOME_CONTENT = "home_content",
    PAGE_CONTENT = "page_content",
    GALLERY = "gallery",
    EVENTS = "events",
    DEVOTIONALS = "devotionals",
    SERMONS = "sermons",
    LESSONS = "lessons",
    POSTS = "posts",
    USERS = "users",
    ACTIVITIES = "activities",
    CHURCH_HOUSES = "church_houses",
    CONTACTS = "contacts",
    DONATIONS = "donations"
}
export declare const ADMIN_MODULE_VALUES: AdminModules[];
export type CreateUser = {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    profileImage?: string | null;
    active?: boolean;
    emailVerified?: boolean;
    adminModules?: string[] | null;
    lastLoginAt?: Date | null;
    emailVerifiedAt?: Date | null;
    emailVerificationTokenHash?: string | null;
    emailVerificationExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
};
export type UpdateUser = {
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string | null;
    role?: UserRoles;
    active?: boolean;
    emailVerified?: boolean;
    adminModules?: string[] | null;
    lastLoginAt?: Date | null;
    emailVerifiedAt?: Date | null;
    emailVerificationTokenHash?: string | null;
    emailVerificationExpiresAt?: Date | null;
    passwordResetTokenHash?: string | null;
    passwordResetExpiresAt?: Date | null;
};
export declare function normalizeAdminModules(modules?: unknown): string[];
export declare function getEffectiveAdminModules(role: UserRoles | string, modules?: unknown): string[];
