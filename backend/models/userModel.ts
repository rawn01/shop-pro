import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDoc } from "../interface/models/user";

const userSchema = new mongoose.Schema<IUserDoc>({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true
    },
    isAdmin: {
        type: "boolean",
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword): Promise<boolean> {
    const isValid = await bcrypt.compare(enteredPassword, this.password);
    return isValid;
}

userSchema.pre("save", async function(next) {
    if(!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUserDoc>("User", userSchema);

export default User;