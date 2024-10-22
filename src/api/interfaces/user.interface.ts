import { Document } from "mongoose";

// Define user properties separately from Document
export interface IUserData {
    fullName: string;
    avatar: string;
    email: string;
    password: string;
    role: string;
    isDeleted: boolean;
}

export interface IUser extends IUserData, Document {
    _id: string;
}

export type ICreateUser = IUserData;

export type ILogin = Pick<ICreateUser, "email" | "password">

export interface IUpdateUser extends Partial<IUserData> {
    newPassword?: string;
}