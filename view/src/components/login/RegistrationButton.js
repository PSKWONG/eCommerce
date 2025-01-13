// -------------------------- Import Modules --------------------------
// //Core Modules
import React from 'react';

//-----------------------Import Components-----------------------
import styles from './login.module.css';


//------------------------ RegistrationButton Component  ------------------------
const RegistrationButton = (iconInfo) => {
const {image, description, alt, action} = iconInfo;
    return (
        <div className={styles.registrationButton} onClick={action}>
            <img src={image} alt={alt} />
            <span>{description}</span>
        </div>
    );
};
export default RegistrationButton;
