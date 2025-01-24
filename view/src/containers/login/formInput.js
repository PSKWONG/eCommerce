//----------------------Import Modules----------------------
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//----------------------Import Components----------------------
import { setErrorMessages, login, selectFetchDataStatus } from '../../features/authentication/authenticationSlice';
import styles from '../../components/login/login.module.css';


const useFormInputData = () => {

    // Set the initial state of the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(); //Phase 2 
    const [isValidPassword, setIsValidPassword] = useState(); // Phase 2 
    const fetchDataStatus = useSelector(selectFetchDataStatus);
    const errorMessage = fetchDataStatus.errorMessage;


    //----------------------Login Form Handlers ----------------------

    //Custom Actions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Handle the form input changes
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    //Handle form Validation
    //Highlight the input fields with errors ( Phase 2 ) 



    //Handle the form submission
    const handLoginSubmit = async (event) => {
        event.preventDefault();

        //Reset message when the form is submitted
        dispatch(setErrorMessages('')); //Clear the message

        //Check if email and password are empty
        if (!email || !password) {
            dispatch(setErrorMessages('Please fill in all fields'));
            return;
        }
        
        //Construct the post request body for API calling
        const logindata = {
            username: email,
            password: password
        };

        dispatch(login({logindata, navigate}));
        
    };

    // ----------------------------- Hook Effect ------------------------------

    // Clear the error messages when the email and password changes
    useEffect(() => {
        dispatch(setErrorMessages(''));
    }, [email, password]);

    //------------------------------ Exporting Data for the Login Form ------------------------------

    const localLoginFormData = useMemo(()=>[
        {
            name: 'email',
            title: 'Email:',
            type: 'email',
            value: email,
            error: isValidEmail === false ? styles.error : styles.valid, // ( Phase 2 )
            actions: {
                onChange: handleOnChange
            }
        },
        {
            name: 'password',
            title: 'Password:',
            type: 'password',
            value: password,
            error: isValidPassword === false ? styles.error : styles.valid, //( Phase 2 )
            actions: {
                onChange: handleOnChange
            }
        }

    ], [email, password, isValidEmail, isValidPassword]); 

    const localLoginFormError = useMemo(()=>({
        message: errorMessage,
        msgStyle: errorMessage ? styles.messgeWrapper : styles.hide
    }), [errorMessage]);

    const localLoginSubmission = useMemo(()=>( {
        actions: {
            onSubmit: handLoginSubmit
        }
    }), [handLoginSubmit]);


    return { localLoginFormData, localLoginFormError, localLoginSubmission }
}; 

export default useFormInputData;
