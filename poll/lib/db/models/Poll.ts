import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        default: () => new Date().getTime(),
    },
    title: {
        type: String,
        required: true,
        trim: true,
        default: "Untitled Poll",
    },
    description: {
        type: String,
        required: false,
        trim: true,
        default: "",
    },
    question: {
        type: String,
        required: true,
        trim: true,
    },
    options: [{
        text: {
            type: String,
            required: true,
            trim: true,
        },
        votes: {
            type: Number,
            default: 0,
        }
    }],
    authorId: {
        type: Schema.Types.Number,
        ref: "User.id",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pollLinks: [{
        type: String,
        required: true,
        unique: true,
    }],
    type: {
        type: String,
        enum: ["single", "multiple"],
        default: "single",
    },
});

export default mongoose.models.Poll || mongoose.model("Poll", schema);