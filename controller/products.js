// -------------------- Importing required modules -------------------
// Core Modules
const express = require('express');
// Import Database Connection
const  ProductDB  = require('../model/products')
//Info Checking
const inputChecking = require('./utilies/userInputChecking');
//Custom Error Handler
const { siteError } = require('./utilies/customErrorHandler');


// ----------------------- Helper function -------------------------
// Product Info Response Constructor
const productInfoResponse = (result) => {
    //Check if the result is an array
    const isArray = Array.isArray(result);
    if (!isArray) {
        result = [result];
    }
    //If the result is not an array, convert it to an array

    //Reconstruct the product object
    const body = {
        products: result
    };
    return body;
};


//------------------------- Product Controller ------------------------------

exports.getProductsByCategory = async (req, res, next) => {
    //Extarct the category id from the request params
    const { category_id } = req.params;
    //Check if the category id is valid
    const isValid = inputChecking.checkId(category_id);
    if (!isValid) {
        return next(siteError(400, 'Invalid category id')); 
    } 

    try {
        //Find the products by category id
        const response = await ProductDB.findByCategory(category_id);

        if (!response) {
            return next(siteError(404, 'No products found'));
        }
        //Construct the response body
        const body = productInfoResponse(response);
        res.status(200).json(body);
    } catch (err) {
        console.log('This is the error from product', err);
        return next(siteError(500, err));
    }
}; 