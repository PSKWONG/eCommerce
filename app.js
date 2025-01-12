
// ---------------------- Global Variable -----------
require('dotenv').config();
const port = process.env.PORT || 3008;
const environment = process.env.NODE_ENV || 'development';

// ----------------- ----- ----- Core Modules -----------
const express = require('express');
const app = express();


// ----------------- ----- ----- Imported Modules -----------

//Error Handler (Development)
const errorhandler = require("errorhandler");
// Error Handler located at the end of the file

//Custome Error Handler
const {customErrorHandler} = require('./controller/utilies/customErrorHandler');

// Morgan 
const morgan = require('morgan');
app.use(morgan('tiny'));

//CORS
const cors = require('cors');
app.use(cors());

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Session
const session = require('./controller/modules/session');
app.use(session); 

//Passport
const passport = require('./controller/modules/passport');
app.use(passport.initialize());
app.use(passport.session());


// ----------------- ----- ----- Routes -----------

//Session Route ( Testing Purpose ) 
const sessionRouter = require('./routes/session');
app.use('/test-session', sessionRouter);

// User Route
const userRouter = require('./routes/users');
app.use('/user', userRouter);

//Authentication Route
const authenRouter = require('./routes/authentication');
app.use('/authen', authenRouter);


//------------------Error Handling ----------------------
if( environment === 'development'){
    app.use(errorhandler());
}
app.use(customErrorHandler);


module.exports = app;

