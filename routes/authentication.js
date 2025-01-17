// --------------------- Import Modules ---------------------
const express = require('express');
const authenticatingRouter = express.Router();
const passport = require('../controller/modules/passport');

//---------------------- Import Controller ---------------------
const { userLocalAuthentication,userFacebookAuthentication , userLogout, authericationCheck } = require('../controller/authentication');


// ---------------------- Authentication Routing ---------------------
// Login - Local Strategy
authenticatingRouter.post('/login', userLocalAuthentication);

// Login - Facebook Strategy
authenticatingRouter.get('/login/facebook', passport.authenticate('facebook'));
authenticatingRouter.get('/login/facebook/callback', userFacebookAuthentication);


// Logout
authenticatingRouter.get('/logout', userLogout);

//Checking Status
authenticatingRouter.get('/check', authericationCheck ); // To be implemented

module.exports = authenticatingRouter; 