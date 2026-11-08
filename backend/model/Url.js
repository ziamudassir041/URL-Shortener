import mongoose, { trusted } from "mongoose";

 const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        trim:true,
        required: true
    },
     shortCode:{
        type:String,
        required:true,
        trim:true
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true
     },
     isActive: {
            type: Boolean,
            default: true
        },
     clicks: {
            type: Number,
            default: 0,
            min: 0
        },

 },{timestamps:true})

const urlModel = mongoose.model("url",urlSchema)

export default urlModel;
