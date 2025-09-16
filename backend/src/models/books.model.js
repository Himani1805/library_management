import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    availability: { type: Boolean, default: true }
  }, {versionKey:false, timestamps: true });

const bookModel = mongoose.model("book", BookSchema);
export { bookModel };
