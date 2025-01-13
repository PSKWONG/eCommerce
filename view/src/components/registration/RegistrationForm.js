// ----------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';


// ----------------------------- Import Components ------------------------------
//Assets
import styles from './registration.module.css';


// ----------------------------- Registration Form ------------------------------

const RegistrationForm = (props) => {
    console.log(props);
    const formItems = props.data;
    const { handleOnChange } = props.actions;

    return (

        <form className={styles.registrationForm}>
            {
                formItems.map((section, index) => {
                    return (
                        <div key= {index}>
                            <label htmlFor={section.name}>{section.title}</label>
                            <input type={section.type} id={section.name} name={section.name} value={section.value} onChange={handleOnChange} />
                        </div>
                    )
                })
            }
            
        </form>
    );
}

export default RegistrationForm;