
const { Pool } = require('pg');
require('dotenv').config();


// --- Create a new Pool 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // --- Create a function "query" for executing SQL queries
  const dbQuery = async (sqlQuery, params = []) => {
    try{
        const client = await pool.connect();
        const result = await client.query(sqlQuery, params);
        client.release();
        return result ;
    }catch(err){
        console.error("Error executing query: " + err);
        throw err;
    }
  }

  module.exports = {pool, dbQuery};