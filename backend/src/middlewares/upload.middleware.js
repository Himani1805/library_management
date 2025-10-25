import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";
import path from 'path';

/**
 * CloudinaryStorage params: return different config for images and pdfs.
 * When resource_type === "raw" Cloudinary stores files not as images.
 */
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const mimetype = file.mimetype || "";
        const isImage = mimetype.startsWith("image/");
        const isPdf = mimetype === "application/pdf";

        // Use path.parse to get the filename without the extension
        const originalnameWithoutExt = path.parse(file.originalname).name;
        // Construct a unique public_id with the original name and a timestamp
        const publicId = `${originalnameWithoutExt}-${Date.now()}`;

        if (isImage) {
            return {
                folder: "library_management/book_covers",
                public_id: `${publicId}${path.extname(file.originalname)}`,
                resource_type: "image",
                format: "png", // Cloudinary will convert if necessary; optional
            };
        }

        if (isPdf) {
            return {
                folder: "library_management/content",
                public_id: `${publicId}${path.extname(file.originalname)}`, // Append extension for raw files
                resource_type: "raw", // raw for PDFs
            };
        }

        // reject unsupported types
        throw new Error("Unsupported file type");
    },
});

/** optional: file filter to restrict uploads */
const fileFilter = (req, file, cb) => {
    const allowedImage = file.mimetype.startsWith("image/");
    const allowedPdf = file.mimetype === "application/pdf";
    if (allowedImage || allowedPdf) {
        cb(null, true);
    } else {
        cb(new Error("Only images and pdfs are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB max per file
    },
});

export { upload };
