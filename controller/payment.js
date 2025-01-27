//--------------- Import Modules --------------------------
require('dotenv').config();
const stripe = require('./modules/stripe'); // Import the Stripe module

//-------------------------- Helper Functions --------------------------
const calculateOrderAmount = (items) => {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let total = 0;
    items.forEach((item) => {
        
        //Extract information from the item object
        const price = parseFloat(item.unit_price.replace('$', '').tofixed(2)) || 0;
        const quantity = Number(item.quantity) || 0;
        
        //Calculate the total amount for the item
        item.amount = price * quantity;
        total += item.amount;
        
    });
    return total;
};


const striplePaymentController = async (req, res, next) => {
    const { items } = req.body;

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

};

module.exports = striplePaymentController;