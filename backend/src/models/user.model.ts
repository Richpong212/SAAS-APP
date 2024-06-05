import mongoose from "mongoose";

// interface for user
export interface IUser {
    name: string;
    email: string;
    password: string;
}

// schema for user
const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true , trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    password: { type: String, required: true, trim: true }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;