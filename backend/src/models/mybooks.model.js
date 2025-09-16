import mongoose from "mongoose";

const MyBookSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
    status: { 
      type: String, 
      enum: ["Want to Read", "Currently Reading", "Read"],
      default: "Want to Read"
    },
    rating: { type: Number, min: 1, max: 5 }
  }, {versionKey:false, timestamps: true });

// MyBookSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const myBookModel = mongoose.model("mybook", MyBookSchema);
export { myBookModel };