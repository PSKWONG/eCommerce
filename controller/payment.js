//--------------- Import Modules --------------------------
require('dotenv').config();
const stripe = require('./modules/stripe'); // Import the Stripe module
const { siteError } = require('./utilies/customErrorHandler');

//-------------------------- Helper Functions --------------------------
const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client

    console.log('This is the items received from the client for payment', items);
    let total = 0;

    items.forEach((item) => {
        // Ensure unit_price is a string
        const unitPriceString = String(item.unit_price);

        // Extract information from the item object
        const price = parseFloat(unitPriceString.replace('$', '')).toFixed(2) || 0;
        const quantity = Number(item.quantity) || 0;

        // Calculate the total amount for the item
        item.amount = price * quantity;
        total += item.amount;
    });

    // Convert total to cents and ensure it's an integer
    return Math.round(total * 100);
};


const striplePaymentController = async (req, res, next) => {
    const { items } = req.body;

    //Check the items array to determine if it is empty
    const isEmpty = !req.body || !items || items.length === 0;
    if (isEmpty) {
        return next(siteError(400, 'The shopping cart is empty'));
    }

    try {

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({

            amount: calculateOrderAmount(items),
            currency: "usd",
            // In the latest version of the API, 
            // specifying the `automatic_payment_methods` parameter is optional 
            // because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });


    } catch (err) {
        console.log('There is error in the payment controller', err);
        return next(siteError(500, 'There is an error in the payment controller'));
    }

};

module.exports = striplePaymentController;