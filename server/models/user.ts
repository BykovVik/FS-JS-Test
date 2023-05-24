import { Schema } from "mongoose";

interface User {
    name: string,
    email: string,
    avatar: string,
    phone: string,
}

const userScheme = new Schema<User>({
    
})