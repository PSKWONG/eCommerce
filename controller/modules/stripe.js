//--------------------------- Import Modules --------------------------
require('dotenv').config();

//Determine the secret key based on the environment
const environment = process.env.NODE_ENV || 'development';
const stripleSecretKey = environment === 'development' ? process.env.STRIPE_SECRET_KEY_TEST  : process.env.STRIPE_SECRET_KEY;

//Import and configure the Striple module
const stripe = require('stripe')(stripleSecretKey);

//Export the module
module.exports = stripe;