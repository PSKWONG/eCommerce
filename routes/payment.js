//-----------Import Modules--------------------------
const express = require('express');
const paymentRouter = express.Router();
const {authericationCheck} = require('../controller/authentication');
const striplePaymentController = require('../controller/payment');



//----------- Payment Route -------------------------

paymentRouter.post('/striple/create-payment-intent', striplePaymentController); 


module.exports = paymentRouter;