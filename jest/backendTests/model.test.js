const {pool, dbQuery} = require('../../model/db'); 
const {UserDB} = require('../../model/users');

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



describe ('Tests on connection with Database', () => {

    beforeAll (async()=>{
        await HelperFunction.clearUserData();
        await HelperFunction.resetUserIDSeq();
    }); 

    afterAll(async () => {
        await pool.end();
    });


    test ('Database connection should be successful', async () => {
        const result = await dbQuery('SELECT 1');
        expect(result).toBeDefined();
    });

    test ('Create a NEW User', async()=>{
        const {username,email, password } = userData[0]
        const result = await UserDB.create(username,email,password);    
        expect(result).toBeDefined();
        expect(result.username).toBe(username);
        expect(result.email).toBe(email);
        expect(result.password).toBe(password);
    }); 


});