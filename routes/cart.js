//-------------------- Import Modules --------------------
const express = require('express');
const { authericationCheck } = require('../controller/authentication');
const cartRouter = express.Router();

const { getCartList, addCartItem, updateCartItem } = require('../controller/cart');
const { createOrder, checkOut } = require('../controller/order');
const { stripePaymentStatusChecking } = require('../controller/payment');


//--------------------- Import Controller -----------------
//Get the Cart List
cartRouter.get('/list', authericationCheck, getCartList)

cartRouter.post('/add', authericationCheck, addCartItem)

cartRouter.put('/update', authericationCheck, updateCartItem)

cartRouter.post('/checkout', authericationCheck, stripePaymentStatusChecking, createOrder, checkOut)


module.exports = cartRouter;