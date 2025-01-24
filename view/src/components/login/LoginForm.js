// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './login.module.css';



const LoginForm = (props) => {

    //------------------------------- Data for the form ------------------------------

    //Set the default values for the form
    const defaultValue =
    {
        local: [],
        error: {
            message: "System is under maintainance",
            msgStyle: styles.messgeWrapper
        },
        submission: {}
    }

    //Set the value for the form 
    const formItems = props.localLoginFormData ? props.localLoginFormData : defaultValue.local;
    const error = props.localLoginFormError ? props.localLoginFormError : defaultValue.error;
    const submission = props.localLoginSubmission ? props.localLoginSubmission : defaultValue.submission;
    

    //------------------------------- Conditional Rendering on form items  ------------------------------

    //Set the Content for the form Items 
    //The Form and Submit Button will only be displayed if there are form items
    const isFormItemEmpty = formItems.length === 0 ? true : false;
    let formContent;
    let submiteContenet;

    switch (isFormItemEmpty) {

        case true:
            formContent = <></>
            submiteContenet = <></>
            break;

        case false:

            //Set the Content for the form Items
            formContent = formItems.map((section, index) => {
                const { name, title, type, value, error, actions } = section;
                const { onChange } = actions;
                return (
                    <div key={index}>
                        <label htmlFor={name}>{title}</label>
                        <input type={type} id={name} name={name} value={value} onChange={onChange} className={error} />
                    </div>
                )
            })

            //Set the Content for the Submit Button
            const { onSubmit } = submission.actions;

            submiteContenet =
                <div className={styles.submitButtonWrapper}>
                    <div className={styles.submitButton} onClick={onSubmit}>
                        Submit
                    </div>
                </div>
            break;

        default:
            formContent = <></>
            submiteContenet = <></>
            break;
    }

    //Set the Content for the Error Message  Items 
    const { msgStyle, message } = error;

    //------------------------------- Return the Form  ------------------------------
    return (

        <form className={styles.loginForm}>

            { /* Form Items   */}
            {formContent}

            { /* Error Message   */}
            <div className={msgStyle}>
                {message}
            </div>

            { /* Submit Button   */}
            {submiteContenet}
        </form>
    );
}

export default LoginForm;