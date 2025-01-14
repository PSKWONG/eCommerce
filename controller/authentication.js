// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');
const { siteError } = require('./utilies/customErrorHandler');


// ---------------------------- Controller  ------------------------------
exports.userAuthentication = (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(siteError(401, info.message)); 
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Login Successful!' });
        });

    })(req, res, next);
}


/*
passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/authen/login',
});
*/
exports.userLogout = (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'Logout Successful!' });
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
        return next(siteError(401, 'Unauthorized Access'));
    }
    
}