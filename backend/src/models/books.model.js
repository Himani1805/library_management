import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, trim: true, unique: true, sparse: true },
    coverImage: { type: String }, // store public URL
    coverImageId: { type: String }, // store public ID URL
    content: { type: String }, // store public URL (pdf)
    contentId: { type: String }, // store public URL ID (pdf)
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

BookSchema.pre("findOneAndDelete", async function (next) {
  const book = await this.model.findOne(this.getQuery());
  if (book?.coverImageId) await cloudinary.uploader.destroy(book.coverImageId, { folder: "library_management/book_covers" });
  if (book?.fileId) await cloudinary.uploader.destroy(book.fileId, { folder: "library_management/content", resource_type: "raw" });
  next();
});

const bookModel = mongoose.model("Book", BookSchema);
export { bookModel };
