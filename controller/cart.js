// -------------------- Importing required modules -------------------
// Core Modules
const express = require('express');
// Import Database Connection 
const  CartDB  = require('../model/cart');
// Info Checking
const inputChecking = require('./utilies/userInputChecking')
//Custom Error Handler
const { siteError } = require('./utilies/customErrorHandler');

//-------------------------------- Helper function -------------------------
const cartResponseBuilder = (result) => {
    //Check if the result is an array
    const isArray = Array.isArray(result);

    //If the result is not an array, convert it to an array
    if (!isArray) {
        result = [result];
    }

    //Reconstruct the product object
    const body = {
        cartList: result
    };
    return body;

}




// ---------------------------- Shopping Cart Controller ------------------------------
// Check the Integrity of request body

exports.cartrequestChecking = async (req, res, next) => {
    //Extract the product_id and quantity from the request body
    let { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return next(siteError(400, 'Please check your request body'));
    }

    //Convert the product_id and quantity to number
    product_id = Number(product_id);
    quantity = Number(quantity);

    //Check if the product_id and quantity are valid
    const isValidProductId = inputChecking.checkId(product_id);
    const isValidQuantity = inputChecking.checkId(quantity);

    if (isValidProductId && isValidQuantity) {
        return next();
    } else {
        return next(siteError(400, 'Product ID and Quantity should be a number'));
    };
};


//Get the Cart List
exports.getCartList = async (req, res, next) => {
    //Get the user id from the request
    const { user_id } = req.user;
    //Get the cart list
    try {
        const result = await CartDB.getAllCartItems(user_id);

        if (result) {
            const cartData = cartResponseBuilder(result);
            res.status(200).json(cartData);
        } else {
            return next(siteError(404, 'No cart items found'));
        }
    } catch (err) {
        console.log('This is the error from getCartList', err);
        next(siteError(500, err));
    };
};

exports.addCartItem = async (req, res, next) => {
    //Get the user id from the request
    const { user_id } = req.user;

    //Resturcut the request body
    const requestBody = req.body;
    const newRequestBody = { ...requestBody, user_id: user_id };

    //Add cart item
    try{
        const result = await CartDB.createCartItems(newRequestBody);
        if(result){
            const cartData = cartResponseBuilder(result);
            res.status(200).json(cartData);
        }else{
            return next(siteError(404, 'No product found'));
        }

    }catch(err){
        console.log('This is the error from addCartItem', err);
        next(siteError(500, err));
    }
};

exports.updateCartItem = async (req, res, next) => {
    //Get the user id from the request
    const { user_id } = req.user;

    //Resturcut the request body
    const requestBody = req.body;
    const newRequestBody = { ...requestBody, user_id: user_id };

    //Update cart item
    try{
        const result = await CartDB.updateCatItems(newRequestBody);
        if(result){
            const cartData = cartResponseBuilder(result);
            res.status(200).json(cartData);
        }else{
            return next(siteError(404, 'No product found'));
        }
    }catch(err){
        console.log('This is the error from updateCartItem', err);
        next(siteError(500, err));
    }

}; 

