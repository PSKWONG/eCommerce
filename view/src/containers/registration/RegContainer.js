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
//Form Effect Hook 
import useFormEffect from './effectHook';



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
    const { handleOnChange, handleValidation, handleSubmission } = useFormActions(formStates);

    //Effect Hook
    useFormEffect(formStates);



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