//------------------------ Import Modules ------------------------
//Core Modules
import React from 'react';


//------------------------ Login Component  ------------------------
//Assets
import '../../assets/styles/App.css'
import styles from './login.module.css';
import RegButton from './RegistrationButton';
import LoginForm from './LoginForm';
import ProviderLogin from './ProviderLogin';



const Login = (props) => {

    const { registration, localProviderLoginData, localLoginFormData } = props

    return (
        <div className="PageWrapper">
            <div className={`${styles.loginAndRegistrationWrapper} floatContentWrapper twoColumnWrapper`}>

                {/* Login Form */}
                <div className={`${styles.loginFormWrapper} ${styles.formWrapper} leftColumn`}>
                    <h1>Login</h1>
                    <LoginForm {...localLoginFormData} />
                    <ProviderLogin {...localProviderLoginData} />
                </div>

                {/* Registration Section */}
                <div className={`${styles.registrationWrapper} ${styles.formWrapper} rightColumn`}>
                    <div className={styles.registratioInfoWrapper}>
                        <h1>Registration</h1>
                        <p>Register to enjouy the following benefit</p>
                        <ul>
                            <li>Stored Shopping Cart</li>
                            <li>Order Tracking</li>
                            <li>Exclusive Offers to discover</li>
                        </ul>
                    </div>
                    <div>
                        <p className={styles.registerInstruct}>Register with:</p>
                        <div className={styles.registerOptions}>
                            {
                                registration.option.map((option, index) => {
                                    return (
                                        <RegButton key={index} {...option} />
                                    )
                                })
                            }
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};
export default Login;