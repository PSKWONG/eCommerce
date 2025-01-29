//---------------- Import Modules -------------------
import React from 'react';

import styles from './cartList.module.css';


const Authentication = (props) =>{

    //----------------------- Extra Data -----------------------
    const {loginButton} = props.authentication

    return (
        <div className={`${loginButton.style} ${styles.guidelinesWrapper}`}>
            <div>{loginButton.guideline}</div>
            <div onClick={loginButton.handler} className={styles.loginButton}>Login</div>
        </div>
    )
}

export default Authentication;