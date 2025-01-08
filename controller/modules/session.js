//--------- Import Required Modules
require('dotenv').config();
const session = require('express-session');
const { pool } = require('../../model/db');
const pgSession = require('connect-pg-simple')(session);

// --------- Configuration Object
const sessionConfiguration =
{
    secret: process.env.Session_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    store: new pgSession({
        pool: pool,
        tableName: 'sessions'
    })

};

const sessionMiddleware = session(sessionConfiguration);

module.exports = sessionMiddleware; 