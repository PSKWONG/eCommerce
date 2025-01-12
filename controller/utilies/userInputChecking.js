const validator = require('validator');

const inputChecking = {
    
    checkEmail: (email) => {
        return validator.isEmail(email);
    },

    checkPassword: (password) => {
        return validator.isStrongPassword(password);
    },

    checkUsername: (username) => {
        return validator.isAlphanumeric(username);
    }, 

    checkId: (id) => {
        return validator.isNumeric(id);
    }

}

module.exports = inputChecking;