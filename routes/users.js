

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const userRouter = express.Router();
const { createUser, userInfoChecking, userAuthentication } = require('../controller/users');

// ----------------- ----- ----- HelperFunction  -----------


//---- -------------------------- Registration ---------------
//user Regiration
userRouter.post('/registration', userInfoChecking, createUser);


module.exports = userRouter;