import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
}, { versionKey: false, timestamps: true })

const userModel = new mongoose.model("user", UserSchema)
export { userModel };