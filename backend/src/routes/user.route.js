import express from "express";
import { deleteUser, getPurchasedBooks, readAllUsers, readUser, updateUser } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/", readAllUsers)
userRouter.get("/:id", readUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/me/purchased", authentication, getPurchasedBooks);

export { userRouter };