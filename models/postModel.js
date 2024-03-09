import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    username:{type:String , required:true,ref:"User"},
    title:{type:String, required:true},
    content:{type:String, required:true},
},
{timestamps:true})

const Post = mongoose.model("Post", postSchema)
export default Post
