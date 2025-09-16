import express from "express"
import { getuserBook, addUserBook,updateBookRating, updateBookStatus } from "../controllers/mybooks.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const myBookRouter = express.Router()
myBookRouter.use(authentication);
myBookRouter.post("/:bookId", addUserBook )
myBookRouter.get("/", getuserBook)
myBookRouter.patch("/:bookId/status", updateBookStatus )
myBookRouter.patch("/:bookId/rating", updateBookRating )

export { myBookRouter };