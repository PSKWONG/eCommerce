// -------------------------- Import Modules --------------------------
// //Core Modules
import React from 'react';
import { Link } from 'react-router-dom';

//-----------------------Import Components-----------------------
import styles from './login.module.css';


//------------------------ RegistrationButton Component  ------------------------
const RegistrationButton = (iconInfo) => {
const {image, description, alt, url} = iconInfo;
    return (
        <Link to={url} className={styles.registrationButton} >
            <img src={image} alt={alt} />
            <span>{description}</span>
        </Link>
    );
};
export default RegistrationButton;
