import { v2 as cloudinary } from "cloudinary";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} from "../config/config.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
});


// const imageStorage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'library_management/book_covers',
//         resource_type: 'image',
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//     }
// })

// const pdfStorage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'library_management/content',
//         resource_type: 'raw',
//         allowed_formats: ['pdf'],
//         // public_id: `${Date.now()}-${file.originalname}`
//     }
// })

export { cloudinary }