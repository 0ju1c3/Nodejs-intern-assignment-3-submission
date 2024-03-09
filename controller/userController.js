import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

//@access public
//@desc Auth user & get token
//@route POST /users/login


export const registerUser = asyncHandler(async (req,res) =>{
    const {username, bio,profilePictureUrl,password, confirmPassword} = req.body
    if(!username || !bio || !profilePictureUrl || !password || !confirmPassword){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    if(password !== confirmPassword){
        res.status(400)
        throw new Error('Passwords do not match')
    }
    const user = await User.findOne({username})//check if user exists
    if(user){
        res.status(400)
        throw new Error('User already exists')
    }
    const hashedPassword = await bcryp.hash(password,10)
    const newUser = await User.create({
        username,
        bio,
        profilePictureUrl,
        password:hashedPassword
    })
    if(newUser){
        res.status(201).json({
            _id:newUser._id,
            username:newUser.username,
            bio:newUser.bio,
            profilePictureUrl:newUser.profilePictureUrl,
        //res.redirect("/users/profile")
        })
        const accessToken = jwt.sign({
            id:user._id,
            username:user.username,
        },process.env.JWT_SECRET,{expiresIn:'15m'})
        res.json({accessToken})
    }
    else{
        res.status(400).json({message:"Invalid user data"})
    }
    res.json({message:"User registered successfully"})
})

//@access public
//@desc Auth user & get token
//@route POST /users/login
export const loginUser = asyncHandler(async (req,res) =>{
    const {username, password} = req.body
    if(!username || !password){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    const user = await User.findOne({username})//check if user exists
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            username:user.username,
        },process.env.JWT_SECRET,{expiresIn:'15m'})
        res.json({accessToken})
    }
    else{
        res.status(401)
        throw new Error('Invalid username or password')
    }
    res.json({message:"User logged in successfully"})
})

//@access private
//@desc Get user profile
//@route GET /users/profile
//accessed by the user who is logged in
export const currentUser = asyncHandler(async (req,res) =>{
    const username = req.username
    const user = await User.findOne({username})//check if user exists
    console.log({user})
    res.json({
        userId:user.userId,
        username:username,
        bio:user.bio,
        profilePictureUrl:user.profilePictureUrl,
    })
})

