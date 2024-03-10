import express from "express"
import connectionDb from "./config/dbConnection.js"
import userRouter from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import sanitize from "sanitize"
import errorHandler from "./middleware/errorHandler.js"
import followRouter from "./routes/followRoute.js"
import rateLimit from 'express-rate-limit'

const port = process.env.PORT || 3000
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
app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the Node.js REST API using ExpressJS and MongoDB"
  });
});
app.use(errorHandler)
const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
})
