import express from "express";
import { addBook, books, deleteBook, updateBook, purchaseBook, viewBookPdf, getBookContent, simulatePayment } from "../controllers/books.controller.js";
import { authentication, authorization } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const bookRouter = express.Router();

bookRouter.post(
    "/",
    authentication,
    authorization(["admin"]),
    upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "content", maxCount: 1 }]),
    addBook
);

bookRouter.get("/", authentication, books);

bookRouter.get("/view/:id", authentication, viewBookPdf); // new

bookRouter.post("/purchase/:id", authentication, purchaseBook); // new

bookRouter.patch(
    "/:id",
    authentication,
    authorization(["admin"]),
    upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "content", maxCount: 1 }]),
    updateBook
);

bookRouter.delete("/:id", authentication, authorization(["admin"]), deleteBook);

bookRouter.get("/:id/content", authentication, getBookContent);

bookRouter.post("/payment/:id", authentication, simulatePayment);

export { bookRouter };
