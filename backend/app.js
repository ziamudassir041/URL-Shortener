import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

dotenv.config()
import "./config/database.js"
import publicuser from "./controller/public/user.js"
import privateuser from "./controller/private/url.js"
import publicredirect from "./controller/public/redirect.js"
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

const frontendOrigins = [
    "http://127.0.0.1:5501",
    "http://localhost:5501"
];
app.use(cors({
    origin(origin, callback) {
        if (!origin || frontendOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get ("/health",(req,res)=>{
    const databaseConnected = mongoose.connection.readyState === 1;
    res.status(databaseConnected ? 200 : 503).json({
        msg: databaseConnected ? "api is running fine" : "api is running but database is unavailable",
        database: databaseConnected ? "connected" : "disconnected"
    })
})
app.use("/public-user",publicuser)
app.use("/private-user",privateuser)
app.use("/public-redirect",publicredirect)
app.use((error, req, res, next) => {
    if (error.message === "Origin is not allowed by CORS") {
        return res.status(403).json({msg:"This frontend origin is not allowed"});
    }
    console.error("Unhandled request error:", error.name);
    return res.status(500).json({msg:"internal server error"});
});
app.listen(port, "0.0.0.0",()=>{
    console.log(`server is running at localhost:${port}`);
    
})
