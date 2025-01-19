

// ----------------- ----- ----- Imported Modules -----------
const express = require('express');
const productRouter = express.Router();
const {getProductsByCategory, getProductById} = require('../controller/products')


// ----------------- ----- ----- HelperFunction  -----------


//---- -------------------------- Product Information Route  ---------------

productRouter.get('/:product_id', getProductById) 
productRouter.get('/list/:category_id', getProductsByCategory) 





module.exports = productRouter;