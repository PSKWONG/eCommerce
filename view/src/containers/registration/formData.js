//------------------------ Import Modules ------------------------
import styles from '../../components/registration/registration.module.css';




//------------------------ Form Data Hook ------------------------

const useFormData = (states, handlers)=>{

    //States in registration forms
    const{
        username,
        email,
        password,
        confirmPassword,
        isValidUsername,
        isValidEmail,
        isValidPassword,
        isValidConfirmPassword,
        isFormCompleted,
        guideline
    }= states;

    //Handlers in registration forms
    const { handleOnChange, handleValidation, handleSubmission } = handlers;

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
    return regFormData;
}; 

export default useFormData;