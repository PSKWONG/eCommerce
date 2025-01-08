// ---------------------- Import Modules -----------
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require("errorhandler");
const cors = require('cors');

// ---------------------- Global Variable -----------
const port = process.env.PORT || 3008;

// ---------------------- Apply Modules -----------
const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(errorhandler());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});