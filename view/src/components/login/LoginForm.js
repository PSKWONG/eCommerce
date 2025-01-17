// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './login.module.css';


// ----------------------------- Registration Form ------------------------------

const LoginForm = (props) => {
    const {msgStyle, message} = props.error;
    const formItems = props.local; 
    const { handleOnChange, handLoginSubmit} = props.actions;


    return (

        <form className={styles.loginForm}>
            {
                formItems.map((section, index) => {
                    return (
                        <div key={index}>
                            <label htmlFor={section.name}>{section.title}</label>
                            <input type={section.type} id={section.name} name={section.name} value={section.value} onChange={handleOnChange} className={section.error} />
                        </div>
                    )
                })
            }
            <div className={msgStyle}>
                {message}
            </div>
            <div className={styles.submitButtonWrapper}>
                <div className={styles.submitButton} onClick={handLoginSubmit}>
                    Submit
                </div>
            </div>

        </form>
    );
}

export default LoginForm;