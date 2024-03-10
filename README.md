#Nodejs intern assignment-3 submission
To design and implement a RESTful APII for a basic social networking application using Node.js and MongoDB. 
The application should have the following functionalities:
1. User registration
2. User login
3. Post a message
4. Get all posts of a user
5. Follow a user
6. Get all followers of a user
7. Get all followings of a user
8. Get the posts  of a user

##Table of Contents
- [Installation](#installation)
- [ENV Variables](#env-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Usage Example](#usage-example)
- [License](#license)

##Installation
1. Clone the repository
```bash
git clone https://github.com/0ju1c3/Nodejs-intern-assignment-3-submission.git
```
2. Install the dependencies
```bash
npm install
```
3. Start the server
```bash
npm start
```

##ENV Variables
The following environment variables are required for the application to run:

```env
JWT_SECRET=your-secret-key
CONNECTION_STRING=mongodb://username:password@host:port/database?options
```


##Usage
The application can be used to create a basic social networking application. The application can be used to register users, login, post messages, follow users, get followers, get followings, and get posts  of a user.

##API Endpoints
The following are the API endpoints of the application:
1. User registration

**Endpoint : /users/register**
Method: POST
Description: Register a new user
Request Body:
```json
{
    "username":"string",
    "bio":"string",
    "profilePictureUrl":"string",
    "password":"string",
    "confirmPassword":"string"
}
```

Response Format:
```json
{
    "message": "User registered successfully",
    "user": {
        "_id": "string",
        "username": "string",
        "bio": "string",
        "profilePictureUrl": "string",
        "password": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "NoFollowers": 0,
        "NoFollowings": 0,
        "NoPosts": 0,
        "__v": 0
    },
    "token": "string"
}
```


2. User login
**Endpoint : /users/login**
Method: POST
Description: Login a user
Request Body:
```json
{
    "username":"string",
    "password":"string"
}
```
response format:
```json
{
    "message": "User logged in successfully",
    "token": "string"
}
```


3. Profile
**Endpoint : /users/profile**
Method: GET
Description: Get the profile of the logged in user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Format:
```json
{
    "user": {
        "_id": "string",
        "username": "string",
        "bio": "string",
        "profilePictureUrl": "string",
        "NoFollowers":"number",
        "NoFollowings":"number",
        "NoPosts":"number"
    }
}
```


4. Update Profile
**Endpoint : /users/profile**
Method: PUT
Description: Update the profile of the logged in user
Request Headers:
```json
{
    "Authorization":"Bearer token"
    "bio":"string",
    "profilePictureUrl":"string"
    "password":"string",
}
```
Response Format:
```json
{
    "message": "Profile updated successfully",
    "user": {
        "_id": "string",
        "username": "string",
        "bio": "string",
        "profilePictureUrl": "string",
        "NoFollowers":"number",
        "NoFollowings":"number",
        "NoPosts":"number"
    }
}
```

5. Post a message
**Endpoint : /posts**
Method: POST
Description: Post a message
Request Headers:
```json
{
    "Authorization":"Bearer token"
    "title":"string",
    "content":"string"
}
```

Response Format:
```json
{
    "message": "Post created successfully",
    "post": {
        "userId": "string",
        "username": "string",
        "title": "string",
        "content": "string",
    }
}
```

6. Get all posts of a user
**Endpoint : /posts**
Method: GET
Description: Get all posts of a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "posts": [
        {
            "userId": "string",
            "username": "string",
            "title": "string",
            "content": "string",
        }
    ]
}
```

7. Update a post
**Endpoint : /posts/:postId**
Method: PUT
Description: Update a post
Request Headers:
```json
{
    "Authorization":"Bearer token",
    "title":"string",
    "content":"string"
}
```
Response Headers:
```json
{
    "message": "Post updated successfully",
    "post": {
        "userId": "string",
        "username": "string",
        "title": "string",
        "content": "string",
    }
}
```

8. Delete a post
**Endpoint : /posts/:postId**
Method: DELETE
Description: Delete a post
Request Headers:
```json
{
    "Authorization":"Bearer token"
}   
```
Response Headers:
```json
{
    "message": "Post removed"
}
```


9. Get all Users
**Endpoint : /follow**
Method: GET
Description: Get all users
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "users": [
        {
            "_id": "string",
            "username": "string",
            "bio": "string",
            "profilePictureUrl": "string",
        }
    ]
}
```

10. Get a User
**Endpoint : /follow/:userId**
Method: GET
Description: Get a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "user": {
        "_id": "string",
        "username": "string",
        "bio": "string",
        "profilePictureUrl": "string",
        "NoFollowers":"number",
        "NoFollowings":"number",
        "NoPosts":"number"
    }
}
```

11. Follow a user
**Endpoint : /follow/:userId**
Method: POST
Description: Follow a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "userId":"string",
    "username":"string",
    "followingId":"string",
    "following":"string"
}
```

12. Get followings of a user
**Endpoint : /follow/followings**
Method: GET
Description: Get followings of a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    {
        "followingId":"string",
        "following":"string"
    }
}
```

13. Get followers of a user
**Endpoint : /follow/followers**
Method: GET
Description: Get followers of a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    {
        "followerId":"string",
        "follower":"string"
    }
}
```


14. Unfollow a user
**Endpoint : /follow/:userId**
Method: DELETE
Description: Unfollow a user
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "message": "User unfollowed"
}
```

15. Get posts of followings
**Endpoint : /follow/posts**
Method: GET
Description: Get posts  of followings
Request Headers:
```json
{
    "Authorization":"Bearer token"
}
```
Response Headers:
```json
{
    "posts": [
        {
            "userId": "string",
            "username": "string",
            "title": "string",
            "content": "string",
        }
    ]
}
```
