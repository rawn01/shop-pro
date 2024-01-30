import { Document } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (pwd: string) => Promise<boolean>;
}