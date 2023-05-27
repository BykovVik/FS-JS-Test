import { IntegerType } from "mongodb";
import { Schema, model } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    password: string,
    date: string,
    gender: string,
    avatar: string,
}

const userScheme = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: String
})

export const User = model<IUser>('User', userScheme)
export default IUser