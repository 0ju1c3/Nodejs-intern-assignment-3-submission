import express from 'express'
import {createPost, getPost, getPosts, updatePost,deletePost} from '../controller/postController.js'
import validateToken from '../middleware/validateTokenHandler.js'

const postRouter = express.Router()
postRouter.post('/',validateToken,createPost)
postRouter.get('/',validateToken,getPosts)
postRouter.get('/:id',validateToken,getPost)
postRouter.put('/:id',validateToken,updatePost)
postRouter.delete('/:id',validateToken,deletePost)

export default postRouter
