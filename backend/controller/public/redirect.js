import express from "express"
import Url from "../../model/Url.js"

const router= express.Router()

router.get("/:shortName",async(req,res)=>{
    try {
        let shortName = req.params.shortName
        let url = await Url.findOne({shortCode:shortName})
        if(!url){
            return res.status(404).json({msg:"short url not found"})
        }
        if (!url.isActive) {
            return res.status(410).json({msg:"short url is inactive"})
        }
        let destination;
        try {
            destination = new URL(url.originalUrl)
            if (!["http:", "https:"].includes(destination.protocol)) throw new Error("unsafe protocol")
        } catch {
            return res.status(500).json({msg:"stored destination URL is invalid"})
        }
        url.clicks = (url.clicks || 0) + 1
        await url.save()
        res.redirect(destination.toString())
        } catch (error) {
        console.error("Redirect failed:", error.name);
        res.status(500).json({msg:"internal server error"})
        
        
    }
})

export default router
