// ------------------------ Import Modules --------------------------
import React, { useEffect } from 'react';
import { checkUserInput, submitRegistration } from '../../features/api/API';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ------------------------ Import Components --------------------------
import RegPage from '../../components/registration/Registration';
import styles from '../../components/registration/registration.module.css';
import { selectIsAuthenticated, checkAuth } from "../../features/authentication/authenticationSlice";

// Form States 
import useFormStates from './states';
//Form Actions
import useFormActions from './formHandlers';



// ------------------------ Registration Container --------------------------
const RegContainer = () => {

    //States in registration forms 
    const formStates = useFormStates();

    const {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        isValidUsername, setIsValidUsername,
        isValidEmail, setIsValidEmail,
        isValidPassword, setIsValidPassword,
        isValidConfirmPassword, setIsValidConfirmPassword,
        isFormCompleted, setIsFormCompleted,
        guideline, setGuideline
    } = formStates;

    //Form Actions 
    const { handleOnChange, handleValidation } = useFormActions(formStates);



    // Access to the authentication Slice 
    const dispatch = useDispatch();
    const authenStatus = useSelector(selectIsAuthenticated);

    //Naviagtion
    const navigate = useNavigate();

    useEffect(() => {
        if (authenStatus) {
            navigate('/');
        }
    }, [authenStatus, navigate]);

    useEffect(() => {
        // Log cookies to verify their presence
        console.log('Cookies:', document.cookie);
    }, []);


    //Actions for registration form



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

                if (status === 200) {
                    dispatch(checkAuth()); //Check the authentication status
                    navigate('/'); //Redirect to the home page
                } else {
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
        setConfirmPassword('');
        setIsValidConfirmPassword();
    }, [password, setConfirmPassword, setIsValidConfirmPassword]);

    //Reset confirmed password when confirm password is changed
    useEffect(() => {
        setIsValidConfirmPassword();
    }, [confirmPassword, setIsValidConfirmPassword]);

    //Check if the form is completed
    useEffect(() => {
        const isCompleted = isValidUsername && isValidEmail && isValidPassword ? true : false;
        setIsFormCompleted(isCompleted);
    }, [isValidUsername, isValidEmail, isValidPassword, setIsFormCompleted]);



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