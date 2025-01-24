// ------------------ Import Modules ------------------
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/authentication/authenticationSlice";
import { checkUserInput, submitRegistration } from '../../features/api/API';

//-------------------- Import Components --------------------
import styles from '../../components/registration/registration.module.css';




const useRegFormData = () => {

    //-------------------------- Registration Form States --------------------------
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



    //-------------------------- Registration Form Handlers --------------------------
    //custom actions
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    console.log(`Error in Registration Validation `, error);
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

        //Actions to take when the form is ready to be submitted
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

                console.log(response, status);

                if (status === 200) {
                    dispatch(checkAuth()); //Check the authentication status
                    navigate('/'); //Navigate to the home page
                } else {
                    message = `Fail to register. ${response.response.data.error.message}`;
                }

            } catch (err) {
                console.log(`Error in Registration Submission `, err);
            }
        }
        //Set the error message in the guideline
        if (message) {
            setGuideline(() => [message, ...guideline]);
        }
        return;
    };

    //-------------------------- Effect Hook --------------------------

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
        const isCompleted = isValidUsername && isValidEmail && isValidPassword;
        setIsFormCompleted(isCompleted);
    }, [isValidUsername, isValidEmail, isValidPassword, setIsFormCompleted]);

    //------------------------- Registration Form Data --------------------------

    const regFormInputData = useMemo(() => [
        {
            name: 'username',
            title: 'Username:',
            type: 'text',
            value: username,
            error: isValidUsername === false ? styles.error : styles.valid,
            actions: {
                onChange: handleOnChange,
                onBlur: handleValidation
            }
        },
        {
            name: 'email',
            title: 'Email:',
            type: 'email',
            value: email,
            error: isValidEmail === false ? styles.error : styles.valid,
            actions: {
                onChange: handleOnChange,
                onBlur: handleValidation
            }
        },
        {
            name: 'password',
            title: 'Password:',
            type: 'password',
            value: password,
            error: isValidPassword === false ? styles.error : styles.valid,
            actions: {
                onChange: handleOnChange,
                onBlur: handleValidation
            }
        },
        {
            name: 'confirmPassword',
            title: 'Confirm Password:',
            type: 'password',
            value: confirmPassword,
            error: isValidConfirmPassword === false ? styles.error : styles.valid,
            actions: {
                onChange: handleOnChange,
                onBlur: handleValidation
            }
        }
    ], [username, email, password, confirmPassword, isValidUsername, isValidEmail, isValidPassword, isValidConfirmPassword]);


    const regFormSubmitData = useMemo(() => (
        {
            title: 'Submit',
            style: isFormCompleted ? styles.submitButton : styles.submitButtonDisabled,
            actions: {
                onSubmit: handleSubmission
            }
        }
    ), [handleSubmission]); // eslint-disable-line react-hooks/exhaustive-deps

    const regFormGuidelineData = useMemo(() => {
        return {
            guideline: guideline
        }
    });

    return {
        regFormInputData,
        regFormSubmitData,
        regFormGuidelineData
    };
};

export default useRegFormData;