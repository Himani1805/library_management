import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const SALT = process.env.PORT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export {PORT, MONGO_URI, SALT, JWT_SECRET_KEY};