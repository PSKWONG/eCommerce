// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './registration.module.css';


// ----------------------------- Registration Form ------------------------------

const RegistrationForm = (props) => {

    //------------------- Form Data -------------------
    const regFormData = props?.regFormInputData || [];
    const submitData = props?.regFormSubmitData || {};
    const { onSubmit } = submitData.actions;

    //------------------- Conditional Rendering -------------------
    const isEmpty = regFormData.length === 0 ? true : false;
    let content;

    switch (true) {
        case isEmpty:
            content = <> </>
            break;

        default:
            content =
                <form className={styles.registrationForm}>
                    {
                        regFormData.map((section, index) => {
                            const { name, title, type, value, error, actions } = section;
                            const { onChange, onBlur } = actions;

                            return (
                                <div key={index}>
                                    <label htmlFor={name}>{title}</label>
                                    <input type={type} id={name} name={name} value={value} onChange={onChange} onBlur={onBlur} className={error} />
                                </div>
                            )
                        })
                    }
                    <div className={styles.submitButtonWrapper}>
                        <div className={submitData.style} onClick={onSubmit}>
                            Submit
                        </div>
                    </div>

                </form>
            break;
    };
    return (
        <>
            {content}
        </>
    );
}

export default RegistrationForm;