import express from "express"
import connectionDb from "./config/dbConnection.js"
import userRouter from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import sanitize from "sanitize"
// Correct the path if needed
const app = express()
connectionDb()
app.use(sanitize.middleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/users", userRouter) 
app.use("/posts", postRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

