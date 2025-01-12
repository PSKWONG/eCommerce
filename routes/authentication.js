// --------------------- Import Modules ---------------------
const express = require('express');
const authenticatingRouter = express.Router();

//---------------------- Import Controller ---------------------
const { userAuthentication, userLogout, authericationCheck } = require('../controller/authentication');


// ---------------------- Authentication Routing ---------------------
// Login
authenticatingRouter.post('/login', userAuthentication);

// Logout
authenticatingRouter.get('/logout', userLogout);

//Checking Status
authenticatingRouter.get('/check', authericationCheck ); // To be implemented

module.exports = authenticatingRouter;