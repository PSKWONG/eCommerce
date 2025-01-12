// --------------------- Import Modules ---------------------
const express = require('express');
const authenticatingRouter = express.Router();

//---------------------- Import Controller ---------------------
const { userAuthentication, userLogout } = require('../controller/authentication');


// ---------------------- Authentication Routing ---------------------
// Login
authenticatingRouter.post('/login', userAuthentication);

// Logout
authenticatingRouter.get('/logout', userLogout);

module.exports = authenticatingRouter;