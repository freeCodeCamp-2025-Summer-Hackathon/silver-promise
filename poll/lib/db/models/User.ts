import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    polls: {
        type: [Schema.Types.ObjectId],
        ref: "Poll",
        default: [],
    }
});

export default mongoose.models.User || mongoose.model("User", schema);