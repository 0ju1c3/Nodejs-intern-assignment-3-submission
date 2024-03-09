import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'


//@access private
//@desc create a new post
//@route POST /posts
export const createPost = asyncHandler(async (req,res) =>{
    const {title, content} = req.body
    if(!title || !content){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    const username = req.username
    const newPost = await Post.create({
        username:username,
        title,
        content
    })
    res.status(201).json(newPost)
})


//@access private
//@desc get all posts
//@route GET /posts
//review
export const getPosts = asyncHandler(async (req,res) =>{
    const username = req.username
    const posts = await Post.find({username})
    res.json(posts)
})


//@access private
//@desc get a single post
//@route GET /posts/:id
export const getPost = asyncHandler(async (req,res) =>{
    const username = req.username
    const post = await Post.findOne({_id:req.params.id,username})
    if(post){
        res.json(post)
    }
    else{
        res.status(404)
        throw new Error('Post not found')
    }
})


//@access private
//@desc update a post
//@route PUT /posts/:id
//review
export const updatePost = asyncHandler(async (req,res) =>{
    const {title, content} = req.body
    const username = req.username
    const post = await Post.findOne({_id:req.params.id,username})
    if(post){
        post.title = title || post.title
        post.content = content || post.content
        const updatedPost = await post.save()
        res.json(updatedPost)
    }
    else{
        res.status(404)
        throw new Error('Post not found')
    }
})

//@access private
//@desc delete a post
//@route DELETE /posts/:id
export const deletePost = asyncHandler(async (req,res) =>{
    const username = req.username
    const post = await Post.findOne({_id:req.params.id,username})
    if(post){
        await Post.deleteOne({_id:req.params.id,username})
        res.json({message:'Post removed'})
    }
    else{
        res.status(404)
        throw new Error('Post not found')
    }
})
