import {getAllUsers, getUserProfile, followUser, getFollowing, getFollowers, unfollowUser,getFollowingPosts} from '../controller/followController.js'
import express from 'express'
import validateToken from '../middleware/validateTokenHandler.js'

const followRouter = express.Router()
followRouter.get('/',validateToken,getAllUsers)
followRouter.get('/:id',validateToken,getUserProfile)
followRouter.post('/user/:id',validateToken,followUser)
followRouter.get('/following',validateToken,getFollowing)
followRouter.get('/followers',validateToken,getFollowers)
followRouter.delete('/unfollow/:id',validateToken,unfollowUser)
followRouter.get('/posts',validateToken,getFollowingPosts)

export default followRouter
