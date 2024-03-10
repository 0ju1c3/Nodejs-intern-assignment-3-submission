import express from "express"
import validateToken from "../middleware/validateTokenHandler.js"
import {registerUser,loginUser,currentUser,updateUserProfile} from "../controller/userController.js"
const userRouter = express.Router()
userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.get('/profile',validateToken,currentUser)//this is a protected route
userRouter.put('/profile',validateToken,updateUserProfile)
//userRouter.get('/profile',currentUser)//this is a protected route

export default userRouter

