

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const userRouter = express.Router();
const {createUser, userInfoChecking} = require('../controller/users');

//---- -------------------------- Registration ---------------

userRouter.post('/',userInfoChecking, createUser );


module.exports = userRouter;