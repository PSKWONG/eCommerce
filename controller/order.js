// --------------------- Import Modules -------------------------- 
const express = require('express'); 

// Import Database Connection 
const OrderDB = require('../model/order'); 
// Info Checking
const inputChecking = require('./utilies/userInputChecking'); 
//Custom Error Handler 
const {siteError} = require('./utilies/customErrorHandler'); 

//------------------- Helper Function ---------------------------

//------------------- Order Controller -------------------------

exports.createOrder = async (req , res , next) =>{
    //Get the user id from the request
    const { user_id } = req.user;
    //Get the payment_ID from the request body (String)
    const {paymentIntentId, cartRecord} = req.body;

    if( !paymentIntentId || !cartRecord){
        return next(siteError(400, 'Please check your request body'));
    }

    //Create a new OrderID
    try {
        //Convert the cartRecord to a string
        const record = JSON.stringify(cartRecord);

        //Create a new order in the database
        const result = await OrderDB.create(paymentIntentId, user_id, record );

        // Initialize the order object in the request
        req.order = req.order || {}; 

        // Add the order id to the request object
        req.order.order_id = result.order_id;
        
        next();

    }catch(err){
        console.log ( 'Error in creating order', err);
        return next(siteError(500, 'Internal Server Error'));
    }

}

exports.checkOut = async (req, res, next) => {
    //Get the user id from the request
    const { user_id } = req.user;

    //Get the order id from the request
    const { order_id } = req.order;

    //Check out the items in the cart
    try {
        const result = await OrderDB.checkOutItems(order_id, user_id);
        console.log('This is the result from checkout', result);
        if(result){
            return res.status(200).json({
                message: 'Checkout successful'
            });
        }else{
            return next(siteError(500, 'Internal Server Error'));
        }
    }catch(err){
        console.log('Error in checking out items', err);
        return next(siteError(500, 'Internal Server Error'));
    }
}