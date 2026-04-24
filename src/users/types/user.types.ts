export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}

export const ADMIN_FULL_ACCESS = "*";

export enum AdminModules {
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
  DONATIONS = "donations",
}

export const ADMIN_MODULE_VALUES = Object.values(AdminModules);

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

export function normalizeAdminModules(modules?: unknown): string[] {
  if (!Array.isArray(modules)) return [];

  const normalized = Array.from(
    new Set(modules.filter((item): item is string => typeof item === "string"))
  ).filter((item) => item === ADMIN_FULL_ACCESS || ADMIN_MODULE_VALUES.includes(item as AdminModules));

  if (normalized.includes(ADMIN_FULL_ACCESS)) {
    return [ADMIN_FULL_ACCESS];
  }

  return normalized;
}

export function getEffectiveAdminModules(
  role: UserRoles | string,
  modules?: unknown
): string[] {
  if (role !== UserRoles.ADMIN) {
    return [];
  }

  const normalized = normalizeAdminModules(modules);
  return normalized.length > 0 ? normalized : [ADMIN_FULL_ACCESS];
}
