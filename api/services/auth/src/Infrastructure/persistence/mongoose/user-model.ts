import mongoose, { Schema, Document } from "mongoose";

export interface UserPersistance {
  _id: string;
  email: string;
  username: string;
  hashedPassword: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type UserPersistanceDocument = UserPersistance & Document;

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    _id: false,
  }
);

export const UserModel = mongoose.model<UserPersistanceDocument>(
  "User",
  UserSchema,
  "users"
);
