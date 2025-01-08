
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










//------------------Error Handling 
app.use(errorhandler());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});