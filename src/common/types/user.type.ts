import { Dispatch, SetStateAction } from "react";
export enum Role {
  USER = "user",
  ADMIN = "admin"
}

export interface IUser {
  _id?: string;
  username: string;
  password?: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
}

export type UserContextType = {
  jwt: string | null;
  setJWT: Dispatch<SetStateAction<string | null>>;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
};
