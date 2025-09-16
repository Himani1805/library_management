import mongoose from "mongoose";
import { MONGO_URI } from "./config.js"

async function connectDB(){
    console.log(MONGO_URI)
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Coonected to mongoDB")
    } catch (error) {
        console.log("Mongodb connection error", error)  
    }
}

export {connectDB};