import mongoose from "mongoose"

const followSchema = mongoose.Schema({
    followerId: {
        type:String,
        required:true,
        ref:"User"
    },
    follower:{
        type:String,
        required:true,
        ref:"User"
    },
    followingId:{
        type:String,
        required:true,
        ref:"User"
    },
    following:{
        type:String,
        required:true,
        ref:"User"
    }
})
const follow = mongoose.model("Follow", followSchema)
export default follow
