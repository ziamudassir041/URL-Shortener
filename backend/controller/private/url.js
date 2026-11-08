import express from "express"
import Url from "../../model/Url.js"
import auth from "../../middleware/auth.js"
import urlModel from "../../model/Url.js"

const router = express.Router()

router.post("/shortener",auth,async(req,res)=>{
    try {
        let {originalUrl, shortName} = req.body;
        if (typeof originalUrl !== "string" || typeof shortName !== "string") {
            return res.status(400).json({ msg: "originalUrl and shortName are required" });
        }
        originalUrl = originalUrl.trim();
        shortName = shortName.trim();
        let parsedUrl;
        try { parsedUrl = new URL(originalUrl); } catch {
            return res.status(400).json({ msg: "Enter a valid URL" });
        }
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).json({ msg: "Only HTTP and HTTPS URLs are allowed" });
        }
        if (!/^[A-Za-z0-9_-]{1,50}$/.test(shortName)) {
            return res.status(400).json({ msg: "Short name must be 1–50 letters, numbers, underscores, or hyphens" });
        }

        let existingurl =   await Url.findOne({shortCode:shortName})
        if(existingurl){
             return res.status(400).json({ msg: "This short name is already taken"});
        } 
        let newUrl={
            originalUrl: originalUrl,
            shortCode:shortName,
            user: req.user.id
        }
        let response = await urlModel.create(newUrl)
          res.status(201).json({
         message: "Short URL created successfully",
            shortUrl: `${req.protocol}://${req.get("host")}/public-redirect/${encodeURIComponent(response.shortCode)}`,
            data: response
        });
    } catch (error) {
        console.error("URL creation failed:", error.name);
        res.status(500).json({msg: "internal Server error"});
        
    }
})
export default router
