export type CreateUser = {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  profileImage?: string | null;
  // active?: boolean;
};

export type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
  profileImage?: string | null;
  role?: UserRoles;
  active?: boolean;
};

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}
