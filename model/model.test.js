const {query} = require('./db'); 

describe ('Tests on connection with Database', () => {
    test ('Database connection should be successful', async () => {
        const result = await query('SELECT 1');
        expect(result).toBeDefined();
    });
});