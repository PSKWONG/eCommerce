//  Core Modules to import 
const {pool, dbQuery} = require('./model/db'); 
const request = require('supertest');
const app = require('./app');



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
        console.log('User Data is cleared'); 
    }, 

    resetUserIDSeq: async() =>{
        await dbQuery(`ALTER SEQUENCE users_user_id_seq RESTART WITH 1`); 
        console.log('User ID sequence reset');
    }
}

// Test Suite

describe('Session Tests', () => {

     // Close the pool after all tests are done
    afterAll(async () => {
        await pool.end();
    });


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