// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');
const { siteError } = require('./utilies/customErrorHandler');


// ---------------------------- Helper function   ------------------------------
const authenticationLogic = (req, res, next, err, user, info) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return res.redirect('/login');
        //return next(siteError(401, 'Authentication failed', info));
    }
    req.logIn(user, (err) => {
        if (err) {
            return next(err);
        }
        //return res.status(200).json({ message: 'Authentication successful', user });
        return res.redirect('/');
    });
}; 


// ---------------------------- Controller  ------------------------------
//Local Authentication
exports.userLocalAuthentication = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        authenticationLogic(req, res, next, err, user, info);
    })(req, res, next);
};

//Facebook Authentication
exports.userFacebookAuthentication = (req, res, next) => {

    passport.authenticate('facebook', (err, user, info) => {
        authenticationLogic(req, res, next, err, user, info);
    })(req, res, next);
};


exports.userLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({ message: 'Logout successful' });
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