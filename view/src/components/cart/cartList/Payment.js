//---------------- Import Modules -------------------
import React from 'react';

import styles from './cartList.module.css';
import { Link } from 'react-router-dom';


const Payment = (props) =>{

    //----------------------- Extra Data -----------------------
    const {guideline, style} = props.payment

    return (
        <div className={`${style} ${styles.guidelinesWrapper}`}>
            <div>{guideline}</div>
            <Link to="/payment" className={styles.paymentButton}>Proceed to Checkout</Link>
        </div>
    )
}

export default Payment;