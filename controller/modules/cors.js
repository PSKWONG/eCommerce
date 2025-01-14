require('dotenv').config();
const cors = require('cors');


// ------------ Important Variable --------------
const environment = process.env.NODE_ENV;
const productionServer = process.env.PRO_FRONTEND_SERVER_URL;
const developmentServer = process.env.DEV_FRONTEND_SERVER_URL;

const corsConfiguration = {
    origin: environment === 'production' ? productionServer : developmentServer, // Allow the frontend to send requests to the backend
    credentials : true // Allow cookies to be sent and received
}

module.exports = cors(corsConfiguration);