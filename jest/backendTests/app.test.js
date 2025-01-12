//  Core Modules to import 
const {pool, dbQuery} = require('../../model/db'); 
const request = require('supertest');
const app = require('../../app');



// Arrange user data
const userData = [
    {
        username: "testUser1",
        email: 'test@example.com',
        password: 'pass#4567ER'
    },
    {
        username: "testUser2",
        email: 'tester2@example.com',
        password: 'pass#8964ER'
    }
];

// Helper Function 

const HelperFunction = {
    clearUserData: async () => {
        await dbQuery('DELETE FROM users');
    }, 

    resetUserIDSeq: async() =>{
        await dbQuery(`ALTER SEQUENCE users_user_id_seq RESTART WITH 1`); 
    }
}

// ---------------------Session Function testing ---------------------

describe('Session Tests', () => {

    it('should create a session and increment views', async () => {
      const agent = request.agent(app);
  
      // First request to initialize session
      let response = await agent.get('/test-session');
      expect(response.text).toBe('Welcome to the session demo. Refresh!');
  
      // Second request to check session persistence
      response = await agent.get('/test-session');
      expect(response.text).toBe('Number of views: 2');
    });
  });

// ---------------------User Authentication testing ---------------------
describe ('User Regsitration and Authentication', () => {
    // Clear the user data before each test
    const agent = request.agent(app);

    beforeEach(async () => {
        await HelperFunction.clearUserData();
        await HelperFunction.resetUserIDSeq();
    });


    it('should register a user', async () => {
        // Register a user
        let response = await agent.post('/registration').send(userData[0]);
        expect(response.status).toBe(200);
        expect(response.body.users[0]).toHaveProperty('username', userData[0].username);
        expect(response.body.users[0]).toHaveProperty('email', userData[0].email);
    });

    it('should not register a user with missing fields', async () => {
        // Register a user with missing fields
        let response = await agent.post('/registration').send({
            username: userData[0].username,
            email: userData[0].email
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should not register a user with invalid email', async () => {

        // Register a user with invalid email
        let response = await agent.post('/registration').send({
            username: userData[0].username,
            email: 'invalid-email',
            password: userData[0].password
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid Email');
    });

    it('should not register a user with invalid password', async () => {

        // Register a user with invalid password
        let response = await agent.post('/registration').send({
            username: userData[0].username,
            email: userData[0].email,
            password: 'invalid-password'
        });
        expect(response.status).toBe(400);
    });

    it('should not register a user with duplicated email', async () => {

        // Register a user
        let response = await agent.post('/registration').send(userData[0]);
        expect(response.status).toBe(200);

        // Register another user with the same email
        response = await agent.post('/registration').send(userData[0]);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Email is already existed');
    });
});