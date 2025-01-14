// ------------------------ Import Modules --------------------------
import React, { useState, useEffect } from 'react';
import { checkUserInput, submitRegistration } from '../features/api/API';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ------------------------ Import Components --------------------------
import RegPage from '../components/registration/Registration';
import styles from '../components/registration/registration.module.css';
import { selectIsAuthenticated } from "../features/authentication/authenticationSlice";


// ------------------------ Registration Container --------------------------
const RegContainer = () => {
    //States in registration forms 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidUsername, setIsValidUsername] = useState();
    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [guideline, setGuideline] = useState([]);

    // Compoent States  
    const authenStatus = useSelector(selectIsAuthenticated);

    //Redirect to Home page if authenticated
    const navigate = useNavigate();
    useEffect(() => {
        if (authenStatus) {
            navigate('/');
        }   
    }, [authenStatus]);

    //Actions for registration form
    const handleOnChange = (e) => {
        // Update the state unpon change in the input field
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
    };
    const handleValidation = async (e) => {
        // Validate the input field upon out of focus on the input field
        const { name, value } = e.target;
        let message;
        let isValid;

        switch (true) {

            case value === '':
                message = `${name} cannot be empty`;
                break;

            case name !== 'confirmPassword':
                try {
                    //Prepare the body for the API call
                    const body = { [name]: value };
                    //Call the API to check the user input
                    const response = await checkUserInput(body);

                    //Response according to the status code
                    isValid = response.status === 200 ? true : false;
                    switch (name) {
                        case 'username':
                            setIsValidUsername(isValid);
                            break;
                        case 'email':
                            setIsValidEmail(isValid);
                            break;
                        case 'password':
                            setIsValidPassword(isValid);
                            break;
                        default:
                            break;
                    }
                    if (!isValid) {
                        //Set the Error message according to the server response                                     
                        message = response.response.data.error.message;
                    }
                } catch (error) {
                    console.log(error);
                }
                break;

            case name === 'confirmPassword':
                //Check if the password and confirm password match
                isValid = password === confirmPassword ? true : false;
                setIsValidConfirmPassword(isValid);
                if (!isValid) {
                    message = 'Password does not match';
                }
                break;
            default:
                break;
        }
        if (!isValid) {
            //Set the error message in the guideline
            setGuideline(() => [message, ...guideline]);
        }
        return;
    };

    const handleSubmission = async (e) => {

        e.preventDefault(); // Prevent the default form submission behavior

        let message;
        let isValid = false;

        switch (true) {

            case !isFormCompleted:
                message = 'Please complete the form';
                break;
            case !isValidConfirmPassword:
                break;
            case isValidUsername && isValidEmail && isValidPassword && isValidConfirmPassword:
                isValid = true;
                break;
            default:
                isValid = false;
                break;
        }

        if (isValid) {
            //Construct the body for the API call
            let body = {
                username: username,
                email: email,
                password: password
            }
            try {
                //Call the API to register the user
                const response = await submitRegistration(body);
                const status = response.status;

                // *****************************Set the server to redirect to login page if the registration is successful *****************************

                if (response.status === 200) {
                    //Redirect to the login page
                    window.location.href = '/login';
                }

                //********************************************************************************************************* */
                if (status !== 200) {
                    message = `Fail to register. ${response.response.data.error.message}`;
                }

            } catch (err) {
                console.log(err);
            }
        }
        //Set the error message in the guideline
        if (message) {
            setGuideline(() => [message, ...guideline]);
        }
        return;
    };


    //Reset Confirmed Password when password is changed
    useEffect(() => {
        {
            setConfirmPassword('');
            setIsValidConfirmPassword();
        }
    }, [password]);

    //Reset confirmed password when confirm password is changed
    useEffect(() => {
        {
            setIsValidConfirmPassword();
        }
    }, [confirmPassword]);

    //Check if the form is completed
    useEffect(() => {
        const isCompleted = isValidUsername && isValidEmail && isValidPassword ? true : false;
        setIsFormCompleted(isCompleted);
    }, [isValidUsername, isValidEmail, isValidPassword]);



    //Registration form Object Constructor 
    const regFormData = {
        registrationForm:
        {
            //Data for the registration form input fields
            data: [
                {
                    name: 'username',
                    title: 'Username:',
                    type: 'text',
                    value: username,
                    error: isValidUsername === false ? styles.error : styles.valid,
                },
                {
                    name: 'email',
                    title: 'Email:',
                    type: 'email',
                    value: email,
                    error: isValidEmail === false ? styles.error : styles.valid,
                },
                {
                    name: 'password',
                    title: 'Password:',
                    type: 'password',
                    value: password,
                    error: isValidPassword === false ? styles.error : styles.valid,
                },
                {
                    name: 'confirmPassword',
                    title: 'Confirm Password:',
                    type: 'password',
                    value: confirmPassword,
                    error: isValidConfirmPassword === false ? styles.error : styles.valid,
                }
            ],
            //Data for the submit button
            submit: {
                style: isFormCompleted ? styles.submitButton : styles.submitButtonDisabled,
            },
            //Data for the actions
            actions: {
                handleOnChange,
                handleValidation,
                handleSubmission
            }
        }
        ,
        guidelines: {
            //Error message for the registration form
            data: guideline
        }
    }

    return (
        < RegPage {...regFormData} />
    );
};

export default RegContainer;