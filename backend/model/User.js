import mongoose  from "mongoose";

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:30,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true,
        lowercase:true
    },
    password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100

    },
    status:{
        type:String,
        enum:["active","inactive","graduated"],
        default: "active"

    }
},{timestamps:true})

const UserModel = mongoose.model("users",userSchema)

export default UserModel;