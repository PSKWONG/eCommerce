// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');
const { siteError } = require('./utilies/customErrorHandler');


// ---------------------------- Controller  ------------------------------
exports.userAuthentication = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
});


exports.userLogout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}; 

exports.authericationCheck = (req, res, next ) => {
    const requestPath = req.originalUrl;
    const result = req.isAuthenticated(); 
    console.log('the requestpath is : ' , requestPath);

    // Request from Status Checking ( Icon Status )
    if (requestPath === '/api/authen/check') {
        console.log(result);
        return res.json(result);
        
    }else if (result) {
        console.log('Should not be here');
        return next();
    }else{
        return next(siteError(401, 'Unauthorized Access'));
    }
    
}