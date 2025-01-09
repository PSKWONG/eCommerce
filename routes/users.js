

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const userRouter = express.Router();
const {createUser} = require('../controller/users');

//---- -------------------------- Registration ---------------

userRouter.post('/', createUser );


module.exports = userRouter;