import mongoose from "mongoose";
import { bookModel } from "../models/books.model.js";
import { userModel } from "../models/user.model.js";
import fs from "fs";
import path from "path";
import { Readable, pipeline } from 'stream';
import { promisify } from 'util';


import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pipe = promisify(pipeline);



/**
 * Safely extract url from Cloudinary file object.
 * multer-storage-cloudinary typically puts the secure url in `path` or `secure_url`.
 */
const getFileUrl = (fileObj) => {
  if (!fileObj) return null;
  return fileObj.path || fileObj.secure_url || fileObj.url || null;
};

async function addBook(req, res, next) {
  try {
    // body values are strings (FormData). Convert types.
    const { title, author, isbn } = req.body;
    const rawPrice = req.body.price;
    const rawAvailability = req.body.availability;

    // minimal validation
    if (!title || !author || !rawPrice) {
      return res.status(400).json({
        message: "title, author and price are required.",
      });
    }

    const price = Number(rawPrice);
    if (Number.isNaN(price) || price < 0) {
      return res.status(400).json({ message: "price must be a valid number >= 0." });
    }

    const availability =
      typeof rawAvailability === "string"
        ? rawAvailability === "true" || rawAvailability === "1"
        : Boolean(rawAvailability);

    // check duplicate by title or isbn (if provided)
    const dupQuery = isbn ? { $or: [{ title }, { isbn }] } : { title };
    const existing = await bookModel.findOne(dupQuery);
    if (existing) {
      return res.status(400).json({ message: "Book with same title or ISBN already exists." });
    }

    // files from multer
    // upload.fields produced req.files object with arrays: req.files.coverImage, req.files.content
    const coverFile = req.files?.coverImage?.[0] ?? null;
    const pdfFile = req.files?.content?.[0] ?? null;

    const coverImageUrl = getFileUrl(coverFile);
    const pdfUrl = getFileUrl(pdfFile);

    // At least allow book creation even if files are missing? Up to you. Here we allow missing files.
    const newBook = new bookModel({
      title,
      author,
      isbn: isbn || undefined,
      coverImage: coverImageUrl || undefined,
      coverImageId: coverImageUrl.public_id || undefined,
      content: pdfUrl || undefined,
      contentId: pdfUrl.public_id || undefined,
      price,
      availability,
    });

    await newBook.save();

    return res.status(201).json({ message: "Book added successfully.", data: newBook });
  } catch (error) {
    console.error("error from addBook:", error);
    // handle mongoose duplicate key error
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error", details: error.keyValue });
    }
    return res.status(500).json({ message: "Book could not be added.", error: error.message });
  }
}

async function books(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 12);
    const search = (req.query.search || "").trim();

    const filter = {};
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [{ title: regex }, { author: regex }, { isbn: regex }];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      bookModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      bookModel.countDocuments(filter),
    ]);

    console.log("user_id - bookController -108", req.user?.userId)
    // If user authenticated, fetch purchased book ids so frontend can mark purchased
    let purchasedBookIds = [];
    if (req.user?.userId) {
      const user = await userModel.findById(req.user.userId).select("purchasedBooks").lean();
      if (user?.purchasedBooks) purchasedBookIds = user.purchasedBooks.map(String);
    }
    console.log("purchasedBookIds - book controller line 114", purchasedBookIds);


    return res.status(200).json({
      message: "Books fetched",
      data: items,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
      purchasedBookIds,
    });
  } catch (err) {
    console.error("books error:", err);
    return res.status(500).json({ message: "Could not fetch books", error: err.message });
  }
}

// Controller to serve the PDF URL or a signed download link
async function viewBookPdf(req, res) {
  try {
    const bookId = req.params.id;
    const user = req.user;

    console.log("book controller - 135", bookId, user);
    const book = await bookModel.findById(bookId).lean();
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (user?.role === "admin") return res.status(200).json({ url: book.content });

    const foundUser = await userModel.findById(user.userId).select("purchasedBooks").lean();
    const allowed = foundUser?.purchasedBooks?.some(id => String(id) === String(bookId));
    if (!allowed) return res.status(403).json({ message: "Please buy the book to view" });

    return res.status(200).json({ url: book.content });
  } catch (error) {
    console.log("error view book page", error);

  }
}


async function updateBook(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body || {};

    // if price or availability are included, convert:
    if (updates.price) updates.price = Number(updates.price);
    if (typeof updates.availability === "string")
      updates.availability = updates.availability === "true" || updates.availability === "1";

    // files: if req.files present, replace urls accordingly
    if (req.files?.coverImage?.[0]) {
      updates.coverImage = getFileUrl(req.files.coverImage[0]);
    }
    if (req.files?.content?.[0]) {
      updates.content = getFileUrl(req.files.content[0]);
    }

    const updated = await bookModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Book not found." });

    return res.status(200).json({ message: "Book updated.", data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not update book", error: err.message });
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const deleted = await bookModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Book not found." });

    if (bookModel.coverImageId) {
      await cloudinary.uploader.destroy(bookModel.coverImageId);
    }

    // 🔹 Delete PDF (document) from Cloudinary
    if (bookModel.contentId) {
      await cloudinary.uploader.destroy(bookModel.contentId, { resource_type: "raw" });
      // note: PDFs and non-images are stored as `resource_type: "raw"`
    }

    await bookModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Book and associated files deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Could not delete book", error: err.message });
  }
}

// POST /api/books/purchase/:id
async function purchaseBook(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).json({ message: "Invalid book id" });

    const bookExists = await bookModel.findById(bookId).select("_id").lean();
    if (!bookExists) return res.status(404).json({ message: "Book not found" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add only if not already present
    const already = user.purchasedBooks?.some(id => String(id) === String(bookId));
    if (already) return res.status(200).json({ message: "Already purchased" });

    user.purchasedBooks = user.purchasedBooks || [];
    user.purchasedBooks.push(bookId);
    await user.save();

    return res.status(200).json({ message: "Purchase recorded", purchasedBookId: bookId });
  } catch (err) {
    console.error("purchaseBook error:", err);
    return res.status(500).json({ message: "Could not record purchase", error: err.message });
  }
}
//  Securely stream PDF only if user purchased it
const getBookContent = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(req.user?.userId).populate("purchasedBooks");

    const purchased = user.purchasedBooks.some(
      (book) => book._id.toString() === id
    );

    if (!purchased && user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Please buy the book first." });
    }

    // console.log("book.controler.js - 250 - id, user, purchased", id, user, purchased);


    const book = await bookModel.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.set({
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        "default-src 'none'; frame-ancestors 'self'; sandbox;",
      // This prevents embedding elsewhere
      "Content-Disposition": `inline; filename="${book.title}.pdf"`,
    });

    // Read book data
    // ----------
    // const fileStream = fs.createWriteStream('test.pdf');
    // await pipe(Readable.from(cloudRes.body), fileStream);

    // ----------

    if (book.content.startsWith('http')) {
      const cloudRes = await fetch(book.content);

      if (!cloudRes.ok || !cloudRes.body) {
        return res.status(500).send('Failed to fetch file from Cloudinary');
      }

      const contentType = cloudRes.headers.get('content-type') || 'application/pdf';
      const contentLength = cloudRes.headers.get('content-length');
      const filename = book.content.split('/').pop();



      res.setHeader('Content-Type', contentType);
      if (contentLength && !isNaN(contentLength)) {
        res.setHeader('Content-Length', contentLength);
      }
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

      await pipe(Readable.from(cloudRes.body), res);

    } else {
      // Serve local file
      const filePath = path.join(__dirname, "..", "uploads", book.content);
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size,
      });
      fs.createReadStream(filePath).pipe(res);
    }



    // console.log("book.controler.js - 256 - book", book);


    // Assuming Cloudinary PDF link stored in book.content
    // if (book.content && book.content.startsWith("http" || "https")) {

    //   console.log("book content - ", book.content)
    //   return res.redirect(book.content); // Temporary secure redirect

    // }

    // // If stored locally
    // console.log("store locally start");
    // const filePath = path.join(__dirname, "..", "uploads", book.content);
    // const stat = fs.statSync(filePath);

    // res.writeHead(200, {
    //   "Content-Type": "application/pdf",
    //   "Content-Length": stat.size,
    // });
    // console.log("store locally filepath", filePath);
    // const readStream = fs.createReadStream(filePath);
    // console.log("store locally read", readStream);
    // readStream.pipe(res);
    // console.log("store locally end");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Simulate payment
const simulatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(req.user?.userId);
    const book = await bookModel.findById(id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!user.purchasedBooks.includes(book._id)) {
      user.purchasedBooks.push(book._id);
      await user.save();
    }

    res.json({ success: true, message: "Payment confirmed", bookId: book._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addBook, books, updateBook, deleteBook, viewBookPdf, purchaseBook, getBookContent, simulatePayment };
