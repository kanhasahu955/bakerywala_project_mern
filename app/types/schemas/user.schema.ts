export interface IUser {
  role: string;
  email: string;
  name: string;
  bio: string;
  avatar: string;
  password: string;
}

export type ILogin = Pick<IUser, "email" | "password">;
