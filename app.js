
// ---------------------- Global Variable -----------
require('dotenv').config();
const port = process.env.PORT || 3008;

// ----------------- ----- ----- Core Modules -----------
const express = require('express');
const app = express();


// ----------------- ----- ----- Imported Modules -----------

//Error Handler
const errorhandler = require("errorhandler");
// Error Handler located at the end of the file

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
const sessionConfiguration = require('./controller/session');
app.use(sessionConfiguration); 


// ----------------- ----- ----- Routes -----------

//Session Route ( Testing Purpose ) 
const sessionRouter = require('./routes/session');
app.use('/test-session', sessionRouter);


//------------------Error Handling 
app.use(errorhandler());


module.exports = app;

