// -------------------- Import Modules --------------------
//env Variable 
require('dotenv').config();


// ---------------------Error Object Constructor ----------
const siteError = (status, message = 'Error is found') => {
   
       
    //Switch Statement for condition 
    switch(status) {
        case 400 :
            message = message || 'Bad Request'
            break;
        case 401:
            message = message || 'Unauthorized'
            break;
        case 404:
            message = message || 'Not Found'
            break;

        default:
            status = status || 500
            message = message || 'Internal Server Error'
    };

    //Construct Error Object
    const error = new Error(); 
    error.status = status ;
    error.message = message ;

    return error;
}; 

//--------------------Custom Error Handler ----------------

const customErrorHandler = (err, req, res, next) => {
    const  { status, message } = err ; 
    res.status(status).send(message);
}; 

module.exports = { siteError, customErrorHandler };