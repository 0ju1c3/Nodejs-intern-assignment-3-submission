import mongoose from "mongoose"
import {v4 as uuidv4} from "uuid"

const userSchema = new mongoose.Schema({
    userId: {type:String, default: uuidv4(), required: true, unique: true},
    username: {type:String, required:true,unique:true},
    bio: {type:String},
    profilePictureUrl : {type:String},
    password: {type:String, required:true},
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User
