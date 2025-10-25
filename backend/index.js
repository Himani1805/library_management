import express from "express";
import { connectDB } from "./src/config/db.js"
import { authRouter } from "./src/routes/auth.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { PORT } from "./src/config/config.js";
import { bookRouter } from "./src/routes/books.route.js";
import { myBookRouter } from "./src/routes/mybooks.route.js";
import { authentication, authorization } from "./src/middlewares/auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/books', bookRouter)
app.use('/api/mybooks', authentication, authorization(["Admin", "User"]), myBookRouter)

app.use(express.urlencoded({ extended: true }));


app.get("/", (request, response) => {
  return response.status(201).json({ message: "Server health is good." })
})

app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`)
  connectDB()
})












