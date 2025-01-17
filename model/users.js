// Import Query function from db.js
const {dbQuery} = require('./db');

const UserDB = {

    // ---------------------- Local Strategy -----------
    create: async (username, email, password) => {
        const result = await dbQuery(
            `INSERT INTO users (username, email, password)
            VALUES ($1,$2,$3)
            RETURNING *`, 
            [username, email, password]
        ); 
        return result.rows[0];
    }, 

    findByEmail: async (email) => {
        const result = await dbQuery(
            `SELECT *
            FROM users
            WHERE email=$1`, 
            [email]
        ); 
        return result.rows[0];
    },

    updateUserEmail: async (email, id) => {
        const result = await dbQuery(
            `UPDATE users
            SET 
                email=$1
            WHERE 
                user_id=$2
            RETURNING *`, 
            [email, id]
        );
        return result.rows[0];
    },

    updateUserName: async (username, id) => {
        const result = await dbQuery(
            `UPDATE users
            SET 
                username=$1
            WHERE 
                user_id=$2
            RETURNING *`, 
            [username, id]
        );
        return result.rows[0];
    },

    updatePassword: async (password, id) => {
        const result = await dbQuery(
            `UPDATE users
            SET 
                password=$1
            WHERE 
                user_id=$2
            RETURNING *`, 
            [password, id]
        );
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await dbQuery(
            `SELECT *
            FROM users
            WHERE user_id=$1`, 
            [id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        await dbQuery(
            `DELETE FROM users
            WHERE user_id=$1`, 
            [id]
        );
    }, 
    // ---------------------- 3rd Party Strategy -----------
    findByProviderId: async (provider, id) => {
        const column = `${provider}_auth`
        const query = 
        `SELECT *
        FROM users
        WHERE ${column}->>'id' = $1`;

        const result = await dbQuery(query, [id]);

        return result.rows[0];
    },
    createUserByPRovider: async (provider, username, profile) => {
        const column = `${provider}_auth`
        const query = 
        `INSERT INTO users (${column}, username)
        VALUES ($1,$2)
        RETURNING *`;

        const result = await dbQuery(query, [profile, username]);

        return result.rows[0];
    }
};

module.exports = {UserDB}; 