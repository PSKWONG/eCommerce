

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const userRouter = express.Router();
const { createUser, userInfoChecking, getUserProfile } = require('../controller/users');
const { authericationCheck } = require('../controller/authentication');

// ----------------- ----- ----- HelperFunction  -----------


//---- -------------------------- Registration ---------------
//user Regiration

userRouter.get('/profile', authericationCheck, getUserProfile ) 

userRouter.post('/registration', userInfoChecking, createUser);


module.exports = userRouter;