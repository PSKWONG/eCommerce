// ---------------------- Import Modules -----------
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// ---------------------- Apply Modules -----------
const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));