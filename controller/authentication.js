// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');
const { siteError } = require('./utilies/customErrorHandler');


// ---------------------------- Helper function   ------------------------------
// User Info Response Constructor
const { userInfoResponse } = require('./users');

// Authentication Logic
const authenticationLogic = (req, res, next, err, user, info) => {

    const requestPath = req.originalUrl;
    const externalPathRegex = /^\/external\//;
    const isExternalPath = externalPathRegex.test(requestPath);

    if (err) {
        return next(err);
    }
    if (!user) {
        const message = info ? info.message : 'Authentication failed';
        if (isExternalPath) {
            return res.redirect('/login');
        }
        return next(siteError(401, message));
    }
    req.logIn(user, (err) => {
        if (err) {
            return next(siteError( '',err));
        }
        if (isExternalPath) {
            return res.redirect('/');
        }
        user = userInfoResponse(user);
        return res.status(200).json({ message: 'Authentication successful', user });
        
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

exports.authericationCheck = (req, res, next) => {
    const requestPath = req.originalUrl;
    const result = req.isAuthenticated();
    console.log('the requestpath is : ', requestPath);

    // Request from Status Checking ( Icon Status )
    if (requestPath === '/api/authen/check') {
        console.log(result);
        return res.json(result);

    } else if (result) {
        console.log('The authentication is successful with result of ', result);
        return next();
    } else {
        return next(siteError(401, 'Unauthorized Access'));
    }

}