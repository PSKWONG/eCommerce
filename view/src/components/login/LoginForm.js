// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './login.module.css';


// ----------------------------- Registration Form ------------------------------

const LoginForm = (props) => {
    const submitBtn = props.submit;
    const formItems = props.local; 
    console.log(props);
    const { handleOnChange} = props.actions;


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
            <div className={styles.submitButtonWrapper}>
                <div className={""} onClick={''}>
                    Submit
                </div>
            </div>

        </form>
    );
}

export default LoginForm;