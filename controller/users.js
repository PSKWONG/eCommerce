// -------------------- Importing required modules -------------------
// Core Modules
const express = require('express');
// Import Database Connection 
const { UserDB } = require('../model/users');
// Bcrypt
const bcrypt = require("bcrypt");
// Passport
const passport = require('../controller/modules/passport')
// Info Checking
const inputChecking = require('./utilies/userInputChecking')
//Custom Error Handler
const { siteError } = require('./utilies/customErrorHandler');


//--------------------------------Helper function-------------------------
//Password Encryption
const passwordencryption = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
};
// User Info Response Constructor 
const userInfoResponse = (result) => {
    result = [result]
    const newUserArray = result.map((user) => {
        return {
            username: user.username,
            email: user.email,
        };
    });
    //Reconstruct the user object
    const body = {
        users: newUserArray
    };
    return body;
};

//------------------------------- User Controller ------------------------------
// UserInfo Input Vadility Checking
exports.userInfoChecking = async (req, res, next) => {

    //Destructuring the request body
    const { username, email, password } = req.body;

    //Check if username is valid
    if (username) {
        const isUserNameValid = inputChecking.checkUsername(username);
        if (!isUserNameValid) {
            return next(siteError(400, 'Username should not contain special characters'));
        }
    };

    //Check if email is valid
    if (email) {
        const isEmailValid = inputChecking.checkEmail(email);
        if (!isEmailValid) {
            return next(siteError(400, 'Invalid Email'));
        }
    };

    //Check if email is duplicated
    if (email) {
        const inputEmail = email.toLowerCase();
        const isEmailDuplicated = await UserDB.findByEmail(inputEmail);
        if (isEmailDuplicated) {
            return next(siteError(400, 'Email is already existed'));
        }
    };

    //Check if password is strong enough
    if (password) {
        const isPasswordValid = inputChecking.checkPassword(password);
        if (!isPasswordValid) {
            return next(
                siteError(
                    400,
                    `Password should contain 
                    at least 8 characters, 
                    1 uppercase letter, 
                    1 lowercase letter, 
                    1 number and 
                    1 special character`
                ));
        }
    }

    //Check the request path for response 
    const requestPath = req.originalUrl

    if (requestPath === '/user/registration/check') {
        return res.status(200).send('User information is valid');
    };

    next();
};

//create User
exports.createUser = async (req, res, next) => {
    //Destructuring the request body
    const { username, email, password } = req.body;

    // Checking the information integrity
    if (!username || !email || !password) {
        return next(siteError(400, 'Missing required fields'));
    }
    try {
        //Encrypt the password
        const encryptedPassword = await passwordencryption(password);
        //Call the DB Query
        const newUser = await UserDB.create(username, email, encryptedPassword);

        //Auto login after registration
        req.login(newUser, function (err) {
            if (err) { return next(err); }
            return res.status(200).send('User is successfully registered');
        });
        /*
        //Construct a unified user response
        const response = userInfoResponse(newUser);
        //return the response
        return res.status(200).json(response);
        */
    } catch (err) {
        return next(err);
    }

};

//get User Profile
exports.getUserProfile = async (req, res, next) => {
    //Destructuring the request user
    const { user } = req;
    //Construct a unified user response
    const response = userInfoResponse(user);
    //return the response
    return res.status(200).json(response);
}