// --------------------------- Import modules ---------------------------
import { checkUserInput, submitRegistration } from '../../features/api/API';




//------------------------- Form actions ----------------------- //

const useFormActions = (states) => {

    // Form states
    const {
        password,
        confirmPassword,
        guideline,
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

    return {
        handleOnChange,
        handleValidation
    };

};

export default useFormActions;