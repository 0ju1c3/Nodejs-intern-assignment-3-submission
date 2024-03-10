import request from "supertest"
import app from "./index"
describe('User API', () => {
  let token;

  // Test user registration
  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser',
          bio: 'Test bio',
          profilePictureUrl: 'test.jpg',
          password: 'TestPass@123',
          confirmPassword: 'TestPass@123',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.accessToken).toBeDefined();
      token = response.body.accessToken;
    });

    it('should handle invalid registration data', async () => {
      const response = await request(app)
        .post('/users/register')
        .send({
            username:"hello",
            bio:"hello",
        });

      expect(response.statusCode).toBe(400);
      // Add more expectations based on your validation logic
    });
  });

  // Test user login
//  describe('POST /users/login', () => {
//    it('should login with valid credentials', async () => {
//      const response = await request(app)
//        .post('/users/login')
//        .send({
//          username: 'testuser',
//          password: 'TestPass@123',
//        });
//
//      expect(response.statusCode).toBe(200);
//      expect(response.body.accessToken).toBeDefined();
//      token = response.body.accessToken;
//    });
//
//    it('should handle invalid login credentials', async () => {
//      const response = await request(app)
//        .post('/users/login')
//        .send({
//            username:"hello",
//            password:"hello"
//        });
//
//      expect(response.statusCode).toBe(401);
//      // Add more expectations based on your login validation logic
//    });
 // });

  // Add more test cases for other user-related endpoints (e.g., profile update)

  // Cleanup (optional): Delete the user account, undo changes, etc.
//  afterAll(async () => {
    // Implement your cleanup logic (e.g., delete the test user)
 // });
});
