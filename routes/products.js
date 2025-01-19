

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const productRouter = express.Router();
const {getProductsByCategory} = require('../controller/products')


// ----------------- ----- ----- HelperFunction  -----------


//---- -------------------------- Registration ---------------
//user Regiration
productRouter.get('/list/:category_id', getProductsByCategory) 




module.exports = productRouter;