import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import validator from 'validator'

//@access public
//@desc Auth user & get token
//@route POST /users/register
export const registerUser = asyncHandler(async (req,res) =>{
    const {username, bio,profilePictureUrl,password, confirmPassword} = req.body
    if(!username || !bio || !profilePictureUrl || !password || !confirmPassword){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    if(password !== confirmPassword){
        res.status(400)
        throw new Error('Passwords do not match')
    } if(!validator.isStrongPassword(password,{
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
        returnScore:false,
    })){
        return res.status(400).json({message:"Password is weak"})
    }
    const user = await User.findOne({username})//check if user exists
    if(user){
        res.status(400)
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        username,
        bio,
        profilePictureUrl,
        password:hashedPassword
    })
    //console.log(newUser)
    if(newUser){
        const accessToken = jwt.sign({
            id:newUser.userId,
        },process.env.JWT_SECRET,{expiresIn:'15m'})
        res.status(201).json({accessToken})
    }
    else{
        res.status(400).json({message:"Invalid user data"})
    }
})

//@access public
//@desc Auth user & get token
//@route POST /users/login
export const loginUser = asyncHandler(async (req,res) =>{
    if(!req.body.username || !req.body.password){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    const {username, password} = req.body
    const user = await User.findOne({username})//check if user exists
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            id:user.userId,
        },process.env.JWT_SECRET,{expiresIn:'15m'})
        res.json({accessToken})
    }
    else{
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

//@access private
//@desc Get user profile
//@route GET /users/profile
//accessed by the user who is logged in
export const currentUser = asyncHandler(async (req,res) =>{
    if(!req.id){
        res.status(404)
        throw new Error('User not found')
    }
    const userId = req.id
    const user = await User.findOne({userId})//check if user exists
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    else{
        res.json({
            userId:user.userId,
            username:user.username,
            bio:user.bio,
            profilePictureUrl:user.profilePictureUrl,
            NoFollowers:user.NoFollowers,
            NoFollowing:user.NoFollowing,
            NoPosts:user.NoPosts
        })
    }    
})

//@access private
//@desc Update user profile
//@route PUT /users/profile
//accessed by the user who is logged in;
export const updateUserProfile = asyncHandler(async (req,res) =>{
    if(!req.id){
        res.status(404)
        throw new Error('User not found')
    }
    const userId  = req.id
    const user = await User.findOne({userId})//check if user exists
    if(user){
        user.bio = req.body.bio || user.bio
        user.profilePictureUrl = req.body.profilePictureUrl || user.profilePictureUrl
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            userId:updatedUser.userId,
            username:updatedUser.username,
            bio:updatedUser.bio,
            profilePictureUrl:updatedUser.profilePictureUrl,
            NoFollowers:updatedUser.NoFollowers,
            NoFollowing:updatedUser.NoFollowing,
            NoPosts:updatedUser.NoPosts
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

//delete user
//@access private
//@desc Delete user profile
//@route DELETE /users/profile
//accessed by the user who is logged in;
export const deleteUserProfile = asyncHandler(async (req,res) =>{
    if(!req.id){
        res.status(404)
        throw new Error('User not found')
    }
    const userId  = req.id
    const user = await User.findOne({userId})//check if user exists
    if(user){
        await user.deleteOne({userId})
        res.json({message:'User removed'})
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})





