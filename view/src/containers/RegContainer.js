// ------------------------ Import Modules --------------------------
import React, { useState, useEffect } from 'react';

// ------------------------ Import Components --------------------------
import RegPage from '../components/registration/Registration';


// ------------------------ Registration Container --------------------------
const RegContainer = () => {
    //States in registration forms 
    const [username, setUsername] = useState('hello');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //Actions for registration form
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    }



    //Registration form Object Constructor 
    const regFormData = {
        registrationForm: [
            {
                name: 'username',
                title: 'Username:',
                type: 'text',
                value: username,
                action: {
                    handleOnChange
                }
            },
            {
                name: 'email',
                title: 'Email:',
                type: 'email',
                value: email,
                action: {
                    handleOnChange
                }
            },
            {
                name: 'password',
                title: 'Password:',
                type: 'password',
                value: password,
                action: {
                    handleOnChange
                }
            },
            {
                name: 'confirmPassword',
                title: 'Confirm Password:',
                type: 'password',
                value: confirmPassword,
                action: {
                    handleOnChange
                }
            }
        ]
        ,
        guidelines: {
            isValidUsername: {
                title: 'Valid username',
                description: 'Username should not contain special characters',
                validation: false
            },
            isValidEmail: {
                title: 'Valid email format',
                description: 'PRovide a valid email address',
                validation: false
            },
            isNewEmail: {
                title: 'Not a registered email',
                description: 'Email can only be registered once',
                validation: false
            },
            isValidPassword: {
                title: 'Strong password',
                description: 'Password should be at least 8 characters long, least one number and one special character',
                validation: false
            },
            isValidConfirmPassword: {
                title: 'Confirm Password check',
                description: 'Double check the password',
                validation: false
            },
        }
    }

    return (
        < RegPage {...regFormData} />
    );
};

export default RegContainer;