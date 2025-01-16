//-------------------- Frontend Routes --------------------

const express = require('express');
const path = require('path');
const frontEndRouter = express.Router();



frontEndRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/build/index.html'));
}); 

module.exports = frontEndRouter;