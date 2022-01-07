import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
};

userSchema.statics.matchPassword = async (password, savedPassword) => {
    try {
        return await bcryptjs.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

export default model("User", userSchema);
