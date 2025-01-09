export interface IUser {
  role: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  password?: string;
}

enum RoleType {
  USER = "USER",
  ADMIN = "ADMIN",
}
