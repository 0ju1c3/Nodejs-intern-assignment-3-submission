import express from "express";
import connectionDb from "./config/dbConnection.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRouter.js";
import sanitize from "sanitize";
import errorHandler from "./middleware/errorHandler.js";
import followRouter from "./routes/followRoute.js";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const app = express();
connectionDb();
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
app.use(limiter);
app.use(sanitize.middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/follow", followRouter);
app.use("/posts", postRouter);
app.use("/", (req, res) => {
  return res.json({
    message: "Nodejs intern assignment-3 submission",
    endpoints: [
      {
        name: "User Registration",
        description: "Register a new user",
        endpoint: "/users/register",
        method: "POST",
      },
      {
        name: "User Login",
        description: "Login a user",
        endpoint: "/users/login",
        method: "POST",
      },
      {
        name: "User Profile",
        description: "Get the profile of the logged-in user",
        endpoint: "/users/profile",
        method: "GET",
      },
      {
        name: "Update Profile",
        description: "Update the profile of the logged-in user",
        endpoint: "/users/profile",
        method: "PUT",
      },
      {
        name: "Post a Message",
        description: "Post a message",
        endpoint: "/posts",
        method: "POST",
      },
      {
        name: "Get a Post",
        description: "Get a post of a user",
        endpoint: "/posts/:postId",
        method: "GET",
      },
      {
        name: "Get All Posts",
        description: "Get all posts of a user",
        endpoint: "/posts",
        method: "GET",
      },
      {
        name: "Update a Post",
        description: "Update a post",
        endpoint: "/posts/:postId",
        method: "PUT",
      },
      {
        name: "Delete a Post",
        description: "Delete a post",
        endpoint: "/posts/:postId",
        method: "DELETE",
      },
      {
        name: "Get All Users",
        description: "Get all users",
        endpoint: "/follow",
        method: "GET",
      },
      {
        name: "Get a User",
        description: "Get a user",
        endpoint: "/follow/:userId",
        method: "GET",
      },
      {
        name: "Follow a User",
        description: "Follow a user",
        endpoint: "/follow/user/:userId",
        method: "POST",
      },
      {
        name: "Get Followings of a User",
        description: "Get followings of a user",
        endpoint: "/follow/followings",
        method: "GET",
      },
      {
        name: "Get Followers of a User",
        description: "Get followers of a user",
        endpoint: "/follow/followers",
        method: "GET",
      },
      {
        name: "Unfollow a User",
        description: "Unfollow a user",
        endpoint: "/follow/:userId",
        method: "DELETE",
      },
      {
        name: "Get Posts of Followings",
        description: "Get posts of followings",
        endpoint: "/follow/posts",
        method: "GET",
      },
    ],
  });
});
app.use(errorHandler);
const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`),
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
