//------------------------ Import Modules ------------------------
//Core Modules
import React from 'react';


//------------------------ Login Component  ------------------------
//Assets
import styles from './login.module.css';
import RegButton from './RegistrationButton'; 



const Login = (props) => {

    const {registration} = props

    return (
        <div className={styles.loginPageWarpper}>
            <div className={styles.loginAndRegistrationWrapper}>
                <div className= {`${styles.loginFormWrapper} ${styles.formWrapper}`}>
                    <h1>Login</h1>
                </div>
                <div className={`${styles.registrationWrapper} ${styles.formWrapper}`}>
                    <h1>Registration</h1>
                    <p>Register to enjouy the following benefit</p>
                    <ul>
                        <li>Stored Shopping Cart</li>
                        <li>Order Tracking</li>
                        <li>Exclusive Offers to discover</li>
                    </ul>
                    <p className={styles.registerInstruct}>Register with:</p>
                    <div className={styles.registerOptions}>
                        {
                            registration.option.map((option, index) => {
                                return (
                                    <RegButton key={index} {...option}/>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};
export default Login;