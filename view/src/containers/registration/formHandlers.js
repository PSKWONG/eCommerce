// --------------------------- Import modules ---------------------------
import { checkUserInput, submitRegistration } from '../../features/api/API';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from "../../features/authentication/authenticationSlice";
import { useDispatch } from 'react-redux';




//------------------------- Form actions ----------------------- //

const useFormActions = (states) => {

    // Form states
    const {
        username,
        email,
        password,
        confirmPassword,
        guideline,
        isFormCompleted,
        isValidPassword,
        isValidEmail,
        isValidConfirmPassword,
        isValidUsername,
        setIsValidConfirmPassword,
        setGuideline,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPassword,
        setIsValidUsername,
        setIsValidEmail,
        setIsValidPassword
    } = states;

    //Custom Actions 
    //Naviagtion
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                console.log(err);
            }
        }
        //Set the error message in the guideline
        if (message) {
            setGuideline(() => [message, ...guideline]);
        }
        return;
    };


    return {
        handleOnChange,
        handleValidation, 
        handleSubmission
    };

};

export default useFormActions;