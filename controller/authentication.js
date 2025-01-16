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


exports.userLogout = (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'Logout Successful!' });
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