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

## Table of Contents
- [Installation](#installation)
- [ENV Variables](#env-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Integration Testing](#integration-testing)

## Installation
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

## ENV Variables
The following environment variables are required for the application to run:

```env
JWT_SECRET=your-secret-key
CONNECTION_STRING=mongodb://username:password@host:port/database?options
PORT=3000
```

## Usage
The application can be used to create a basic social networking application. The application can be used to register users, login, post messages, follow users, get followers, get followings, and get posts  of a user.

## API Endpoints
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
    "accessToken": "string"
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
    "accessToken": "string"
}
```


3. Profile
**Endpoint : /users/profile**
Method: GET
Description: Get the profile of the logged in user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Format:
```json
{
    "userId": "string",
    "username": "string",
    "bio": "string",
    "profilePictureUrl": "string",
    "NoFollowers":"number",
    "NoFollowings":"number",
    "NoPosts":"number"
}
```


4. Update Profile
**Endpoint : /users/profile**
Method: PUT
Description: Update the profile of the logged in user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
    "bio":"string",
    "profilePictureUrl":"string",
    "password":"string",
}
```
Response Format:
```json
{
    "userId": "string",
    "username": "string",
    "bio": "string",
    "profilePictureUrl": "string",
    "NoFollowers":"number",
    "NoFollowings":"number",
    "NoPosts":"number"
}
```

5. Post a message
**Endpoint : /posts**
Method: POST
Description: Post a message
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
    "title":"string",
    "content":"string"
}
```

Response Format:
```json
{
    "userId": "string",
    "username": "string",
    "title": "string",
    "content": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

6. Get a post of a user
**Endpoint : /posts/:postId**
Method: GET
Description: Get a post of a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Headers:
```json
{
    "userId": "string",
    "username": "string",
    "title": "string",
    "content": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

7. Get all posts of a user
**Endpoint : /posts**
Method: GET
Description: Get all posts of a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Headers:
```json
{
    {

        "userId": "string",
            "username": "string",
            "title": "string",
            "content": "string",
            "_id": "string",
            "createdAt": "string",
            "updatedAt": "string"
    },
}
```

8. Update a post
**Endpoint : /posts/:postId**
Method: PUT
Description: Update a post
Request Headers:
```json
{
    "Authorization":"Bearer accessToken",
    "title":"string",
    "content":"string"
}
```
Response Headers:
```json
{
    "_id": "string",
    "userId": "string",
    "username": "string",
    "title": "string",
    "content": "string",
    "createdAt": "string",
    "updatedAt": "string"
}
```

9. Delete a post
**Endpoint : /posts/:postId**
Method: DELETE
Description: Delete a post
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}   
```
Response Headers:
```json
{
    "message": "Post removed"
}
```


10. Get all Users
**Endpoint : /follow**
Method: GET
Description: Get all users
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Headers:
```json
{
    "users": [
        {
            "_id": "string",
            "userId": "string",
            "username": "string",
            "bio": "string",
            "profilePictureUrl": "string",
        }
    ]
}
```

11. Get a User
**Endpoint : /follow/:userId**
Method: GET
Description: Get a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Headers:
```json
{
    "user": {
        "_id": "string",
        "userId": "string",
        "username": "string",
        "bio": "string",
        "profilePictureUrl": "string",
        "NoFollowers":"number",
        "NoFollowings":"number",
        "NoPosts":"number"
    }
}
```

12. Follow a user
**Endpoint : /follow/user/:userId**
Method: POST
Description: Follow a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
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

13. Get followings of a user
**Endpoint : /follow/followings**
Method: GET
Description: Get followings of a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
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

14. Get followers of a user
**Endpoint : /follow/followers**
Method: GET
Description: Get followers of a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
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


15. Unfollow a user
**Endpoint : /follow/:userId**
Method: DELETE
Description: Unfollow a user
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
}
```
Response Headers:
```json
{
    "message": "User unfollowed"
}
```

16. Get posts of followings
**Endpoint : /follow/posts**
Method: GET
Description: Get posts  of followings
Request Headers:
```json
{
    "Authorization":"Bearer accessToken"
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

## Database Schema


### User-Fields
The `users` collection stores information about registered users.

- **_id**: ObjectId (automatically generated)
- **userId**: String (generated using uuidv4, required, unique) - Unique identifier for the user.
- **username**: String (required, unique) - The username of the user.
- **bio**: String - The biography or additional information about the user.
- **profilePictureUrl**: String - The URL of the user's profile picture.
- **password**: String (required) - The hashed password of the user.
- **NoFollowers**: Number (default: 0) - The number of followers for the user.
- **NoFollowing**: Number (default: 0) - The number of users the user is following.
- **NoPosts**: Number (default: 0) - The total number of posts created by the user.
- **createdAt**: Date (automatically generated) - The timestamp when the user was created.
- **updatedAt**: Date (automatically generated) - The timestamp when the user was last updated.

### Post-Fields
The `posts` collection stores information about the posts created by users.


- **_id**: ObjectId (automatically generated)
- **userId**: String (required, reference to User collection) - The unique identifier of the user who created the post.
- **username**: String (required, reference to User collection) - The username of the user who created the post.
- **title**: String (required) - The title of the post.
- **content**: String (required) - The content or body of the post.
- **createdAt**: Date (automatically generated) - The timestamp when the post was created.
- **updatedAt**: Date (automatically generated) - The timestamp when the post was last updated.

### Relationships

- **userId**: References the `User` collection using the `userId` field.
- **username**: References the `User` collection using the `username` field.


### Follow-Fields
The `follows` collection stores information about the users that a user is following and the users that are following the user.

- **_id**: ObjectId (automatically generated)
- **followerId**: String (required, reference to User collection) - The unique identifier of the follower user.
- **follower**: String (required, reference to User collection) - The username of the follower user.
- **followingId**: String (required, reference to User collection) - The unique identifier of the user being followed.
- **following**: String (required, reference to User collection) - The username of the user being followed.
- **createdAt**: Date (automatically generated) - The timestamp when the follow relationship was created.
- **updatedAt**: Date (automatically generated) - The timestamp when the follow relationship was last updated.

### Relationships

- **followerId**: References the `User` collection using the `followerId` field.
- **follower**: References the `User` collection using the `follower` field.
- **followingId**: References the `User` collection using the `followingId` field.
- **following**: References the `User` collection using the `following` field.

## Integration Testing
The application has been tested using Collection Runner in Postman. The tests include the following:
1. User registration
2. User login
3. User profile
4. Update profile
5. Delete user
6. Post a message
7. Update a post
8. Get all Posts
9. Get a post
10. Delete a post
11. Get all Users
12. Get a User
13. Follow a user
14. Get followings of the current user
15. Get followers of the current user
16. Unfollow a user
17. Get posts of followings

The tests have been written to ensure that the API endpoints are working as expected and that the responses are correct.
To run the tests, import the `Node Assignment.postman_collection.json` file in the test directiory and run the collection.


