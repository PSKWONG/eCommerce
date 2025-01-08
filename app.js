
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

app.get('/test-session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the session demo. Refresh!');
  }
});


//------------------Error Handling 
app.use(errorhandler());


module.exports = app;

