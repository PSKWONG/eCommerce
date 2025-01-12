// ---------------------------- Import Modules ------------------------------
const express = require('express');
const passport = require('./modules/passport');


// ---------------------------- Controller  ------------------------------
exports.userAuthentication = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
});

exports.userLogout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}