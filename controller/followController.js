import  asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Follow from '../models/followModel.js'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'

// @access private
// @desc display all users except the current user
// @route GET /follow
export const getAllUsers = asyncHandler(async (req, res) => {
    const userId = req.id
    const users = await User.find({ userId: { $ne: userId } }).select([
            "userId",
            "username",
            "bio",
            "profilePictureUrl",
            "NoFollowers",
            "NoFollowing",
            "NoPosts"
        ]);
    res.json(users)
})

// @access private
// @desc display user profile
// @route GET /follow/:id 
// @param id 
export const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({ userId }).select([
        "userId",
        "username",
        "bio",
        "profilePictureUrl",
        "NoFollowers",
        "NoFollowing",
        "NoPosts"
    ])
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @access private
// @desc follow a user
// @route POST /follow/user/:id 
// @param id
export const followUser = asyncHandler(async (req, res) => {
    const userId = req.id
    const followingId = req.params.id
    const currentUser = await User.findOne({userId})
    const followUser = await User.findOne({ userId: followingId })
    if (followUser) {
        const follow = await Follow.findOne({ followerId: userId, followingId: followingId })
        if (follow) {
            res.status(400)
            throw new Error('You are already following this user')
        }
        else {
            const newFollow = new Follow({
                followerId: userId,
                follower: currentUser.username,
                followingId: followingId,
                following: followUser.username
            })
            currentUser.NoFollowing =  currentUser.NoFollowing + 1
            const updateCurrentUser = await currentUser.save()
            followUser.NoFollowers = followUser.NoFollowers + 1
            const updateFollowUser = await followUser.save()
            const savedFollow = await newFollow.save()
            res.json({
                userId: savedFollow.followerId,
                username: savedFollow.follower,
                followingId: savedFollow.followingId,
                following: savedFollow.following
            })
        }
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @access private
// @desc display all users that the current user is following
// @route GET /follow/following
// @param id
export const getFollowing = asyncHandler(async (req, res) => {
    const userId = req.id
    const following = await Follow.find({ followerId: userId }).select([
        "followingId",
        "following"
    ])
    res.json(following)
})

// @access private
// @desc display all users that are following the current user
// @route GET /follow/followers
// @param id
export const getFollowers = asyncHandler(async (req, res) => {
    const userId = req.id
    const followers = await Follow.find({ followingId: userId }).select([
        "followerId",
        "follower"
    ])
    res.json(followers)
})


// @access private
// @desc unfollow a user
// @route DELETE /follow/unfollow/:id 
export const unfollowUser = asyncHandler(async (req, res) => {
    const userId = req.id
    const followingId = req.params.id
    const currentUser = await User.findOne({ userId })
    const followUser = await User.findOne({ userId: followingId })
    if (followUser) {
        const follow = await Follow.findOne({ followerId: userId, followingId: followingId })
        if (follow) {
            currentUser.NoFollowing = currentUser.NoFollowing - 1
            const updateCurrentUser = await currentUser.save()
            followUser.NoFollowers = followUser.NoFollowers - 1
            const updateFollowUser = await followUser.save()
            await follow.remove()
            res.json({ message: 'User unfollowed' })
        }
        else {
            res.status(400)
            throw new Error('You are not following this user')
        }
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @access private
// @desc display all posts of users that the current user is following
// @route GET /follow/posts
export const getFollowingPosts = asyncHandler(async (req, res) => {
    const userId = req.id
    const following = await Follow.find({ followerId: userId }).select([
        "followingId",
        "following"
    ])
    const followingIds = following.map(follow => follow.followingId)
    const posts = await Post.find({ userId: { $in: followingIds } }).sort({ createdAt: -1 })
    res.json(posts)
}













