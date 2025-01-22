
// ---------------------- Global Variable -----------
require('dotenv').config();
const port = process.env.PORT || 3008;
const environment = process.env.NODE_ENV || 'development';

// ----------------- ----- ----- Core Modules -----------
const express = require('express');
const path = require('path');
const app = express();


// ----------------- ----- ----- Imported Modules -----------

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'view/build')));

//Error Handler (Development)
const errorhandler = require("errorhandler");
// Error Handler located at the end of the file

//Custome Error Handler
const {customErrorHandler} = require('./controller/utilies/customErrorHandler');

// Morgan 
const morgan = require('morgan');
app.use(morgan('tiny'));

//CORS
const cors = require('./controller/modules/cors');
app.use(cors);

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
app.use('/api/user', userRouter);

//Authentication Route
const authenRouter = require('./routes/authentication');
app.use('/api/authen', authenRouter);
app.use('/external/authen', authenRouter);

//Product Route
const productRouter = require('./routes/products');
app.use('/api/product', productRouter);

//Cart Route
const cartRouter = require('./routes/cart');
app.use('/api/cart', cartRouter);


// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
const frontEndRouter = require('./routes/frontend');
app.use('/', frontEndRouter);

//------------------Error Handling ----------------------
if( environment === 'development'){
    app.use(errorhandler());
}
app.use(customErrorHandler);


module.exports = app;

