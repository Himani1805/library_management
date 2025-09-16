import express from "express";
import { deleteUser, readAllUsers, readUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", readAllUsers)
userRouter.get("/:id", readUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export {userRouter};