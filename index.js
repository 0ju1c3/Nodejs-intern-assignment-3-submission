import express from "express"
import connectionDb from "./config/dbConnection.js"
import userRouter from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import sanitize from "sanitize"
import errorHandler from "./middleware/errorHandler.js"
import followRouter from "./routes/followRoute.js"
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, 
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

const app = express()
connectionDb()
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
app.use(limiter)
app.use(sanitize.middleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/users", userRouter) 
app.use('/follow',followRouter)
app.use("/posts", postRouter)
app.use(errorHandler)

app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
});
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

