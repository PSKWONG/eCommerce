//  Core Modules to import 
const {pool, dbQuery} = require('../../model/db'); 
const request = require('supertest');
const app = require('../../app');



// Arrange user data
const agent = request.agent(app);
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

      // First request to initialize session
      let response = await agent.get('/test-session');
      expect(response.text).toBe('Welcome to the session demo. Refresh!');
  
      // Second request to check session persistence
      response = await agent.get('/test-session');
      expect(response.text).toBe('Number of views: 2');
    });
  });

// ---------------------User Authentication testing ---------------------
describe ('User Regsitration', () => {
    // Clear the user data before each test

    beforeEach(async () => {
        await agent.get('/authen/logout');
        await HelperFunction.clearUserData();
        await HelperFunction.resetUserIDSeq();
    });


    it('should register a user', async () => {
        // Register a user
        let response = await agent.post('/user/registration').send(userData[0]);
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
    });

    it('should not register a user with missing fields', async () => {
        // Register a user with missing fields
        let response = await agent.post('/user/registration').send({
            username: userData[0].username,
            email: userData[0].email
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should not register a user with invalid email', async () => {

        // Register a user with invalid email
        let response = await agent.post('/user/registration').send({
            username: userData[0].username,
            email: 'invalid-email',
            password: userData[0].password
        });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid Email');
    });

    it('should not register a user with invalid password', async () => {

        // Register a user with invalid password
        let response = await agent.post('/user/registration').send({
            username: userData[0].username,
            email: userData[0].email,
            password: 'invalid-password'
        });
        expect(response.status).toBe(400);
    });

    it('should not register a user with duplicated email', async () => {

        // Register a user
        let response = await agent.post('/user/registration').send(userData[0]);

        // Register another user with the same email
        response = await agent.post('/user/registration').send(userData[0]);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Email is already existed');
    });
});

describe ('User Authentication', () => {

    beforeAll(async () => {
        // Make sure it is logged out
        await agent.get('/authen/logout');
        // Clear the user data before each test
        await HelperFunction.clearUserData();
        await HelperFunction.resetUserIDSeq();
        // Register a user
        const response = await agent.post('/user/registration').send(userData[0]);
        // Make sure it is logged out
        await agent.get('/authen/logout');
    });
    

    it('should login a user', async () => {
        // Login a user
        let response = await agent.post('/authen/login').send({
            username: userData[0].email,
            password: userData[0].password
        });
        console.log(response.body);
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/user/profile');
    });

    it ('should not login a user with missing fields', async () => {    
        // Login a user with missing fields
        let response = await agent.post('/authen/login').send({
            username: userData[0].email
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe('Missing credentials');
    });
    
    it ('should not login a user with invalid credentials', async () => {
        // Login a user with invalid credentials
        let response = await agent.post('/authen/login').send({
            username: userData[0].email,
            password: 'invalid-password'
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe('Incorrect password.');
    });

    it ('should logout a user', async () => {
        // Login a user
        let response = await agent.post('/authen/login').send({
            username: userData[0].email,
            password: userData[0].password
        });
        expect(response.status).toBe(302);

        // Logout a user
        response = await agent.get('/authen/logout');
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/');
    });

    it ('should check user authentication status', async () => {
        // Check user authentication status
        let response = await agent.get('/authen/check');
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(false);

        // Login a user
        response = await agent.post('/authen/login').send({
            username: userData[0].email,
            password: userData[0].password
        });
        expect(response.status).toBe(302);

        // Check user authentication status
        response = await agent.get('/authen/check');
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(true);
    });

    it ('should redirect to login page if not authenticated', async () => {
        //Logout user
        await agent.get('/authen/logout');
        // Check user authentication status
        let response = await agent.get('/user/profile');
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/login');
    });

});