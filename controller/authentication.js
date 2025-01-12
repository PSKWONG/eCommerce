// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');
const { siteError } = require('./utilies/customErrorHandler');


// ---------------------------- Controller  ------------------------------
exports.userAuthentication = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/authen/login',
});

exports.userLogout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}; 

exports.authericationCheck = (req, res, next ) => {
    const requestPath = req.originalUrl;
    const result = req.isAuthenticated(); 

    // Request from Status Checking ( Icon Status )
    if (requestPath === '/authen/check') {
        return res.json({ result });
    }else if (result) {
        return next();
    }else{
        return res.redirect('/authen/login');
    }
    
}