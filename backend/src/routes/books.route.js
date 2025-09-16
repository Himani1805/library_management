import express from "express"
import { addBook, books, deleteBook, updateBook } from "../controllers/books.controller.js";
import { authentication, authriozation } from "../middlewares/auth.middleware.js";

const bookRouter = express.Router()

bookRouter.post("/",  authentication, authriozation(["Admin"]), addBook )
// GET /api/books (public)
bookRouter.get("/", books )
bookRouter.patch("/:id",  authentication, authriozation(["Admin"]), updateBook )
bookRouter.delete("/:id",  authentication, authriozation(["Admin"]), deleteBook )

export { bookRouter };
