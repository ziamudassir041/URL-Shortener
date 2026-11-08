import express from "express"
import UserModel from "../../model/User.js"
import bcrypt from "bcrypt"
import tokenize from "../../utils/token.js"

const router = express.Router()

router.post("/register",async(req,res)=>{
    try {
        let {name,email,password}=req.body || {}
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({msg:"name, email, and password are required"})
        }
        name = name.trim()
        email = email.trim().toLowerCase()
        if (name.length < 3 || name.length > 30) return res.status(400).json({msg:"Name must be 3–30 characters"})
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({msg:"Enter a valid email address"})
        if (password.length < 8 || password.length > 100) return res.status(400).json({msg:"Password must be 8–100 characters"})
        let existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:"user already registered"})

        }
         let newUser = {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            };

        let response = await UserModel.create(newUser)
        res.status(201).json({msg:"user created successfully",user:{id:response._id,name:response.name,email:response.email}})
    } catch (error) {
        console.error("Registration failed:", error.name);
        
        return res.status(500).json({msg:"registration failed"})
        
    }
})

router.post("/login",async(req,res)=>{
    
    try {
        let {email, password} = req.body || {};
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({message:"Email and password are required"});
        }
        email = email.trim().toLowerCase();
        let checkIfExists = await UserModel.findOne({email: email});
        if(!checkIfExists)
        {
            return res.status(404).json({message: "user not found, please register"});
        }
        const passwordMatches = await bcrypt.compare(password, checkIfExists.password);
        if(!passwordMatches)
        {
            return res.status(400).json({message: "Incorrect credentials"});
        }
        let payload = {
            id: checkIfExists._id
        };
        let token = await tokenize(payload);
        res.status(200).json({message: "Logged in successfully", token});
        
    } catch (error) {
         console.error("Login failed:", error.name);
         return res.status(500).json({msg:"internal server error"})
        
    }
})
export default router
