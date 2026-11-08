import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

async function connectDB() {
    try {

        const db_uri=process.env.MONGO_URI
        await mongoose.connect(db_uri)
        console.log("mongodb connect successfully");
        
        
    } catch (error) {
        console.error("MongoDB connection failed:", error.name)
        
    }
    
}
connectDB()
