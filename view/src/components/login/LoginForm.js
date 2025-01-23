// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './login.module.css';


// ----------------------------- Registration Form ------------------------------

const LoginForm = (props) => {

    //Set the default values for the form
    const defaultValue =
    {
        local: [],
        error: {
            message: "System is under maintainance",
            msgStyle: styles.messgeWrapper
        },
        actions: {
            handleOnChange: (e) => {
                e.preventDefault();
                console.log('System is under maintainance');
            },
            handLoginSubmit: (e) => {
                e.preventDefault();
                console.log('System is under maintainance');
            }
        }
    }

    //Set the value for the form 
    const formItems = props.local ? props.local : defaultValue.local;
    const error = props.local ? props.error : defaultValue.error;
    const { handleOnChange, handLoginSubmit } = props.actions ? props.actions : defaultValue.actions;

    //Set the Content for the form Items 
    const isFormItemEmpty = formItems.length === 0 ? true : false;
    let formContent;
    let submiteContenet;

    switch (isFormItemEmpty) {
        case true:
            formContent = <></>
            submiteContenet = <></>
            break;

        case false:

            formContent = formItems.map((section, index) => {
                return (
                    <div key={index}>
                        <label htmlFor={section.name}>{section.title}</label>
                        <input type={section.type} id={section.name} name={section.name} value={section.value} onChange={handleOnChange} className={section.error} />
                    </div>
                )
            })

            submiteContenet =
                <div className={styles.submitButtonWrapper}>
                    <div className={styles.submitButton} onClick={handLoginSubmit}>
                        Submit
                    </div>
                </div>

            break;

        default:
            formContent = <></>
            break;
    }

    //Set the Content for the Error Message  Items 
    const { msgStyle, message } = error;

    //Set the Content for the form Items 



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