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
import ButtonList from './ButtonList';



const Login = (props) => {

    const { regProviderData, loginProviderData, localLoginFormData } = props
    const providerList = loginProviderData.providers;
    const regProviderList = regProviderData.providers;

    return (
        <div className="PageWrapper">
            <div className={`${styles.loginAndRegistrationWrapper} floatContentWrapper twoColumnWrapper`}>

                {/* Login Form */}
                <div className={`${styles.loginFormWrapper} ${styles.formWrapper} leftColumn`}>
                    <h1>Login</h1>
                    <LoginForm {...localLoginFormData} />
                    <div className={styles.providerOptionsWrapper} >
                        <h3>Other login options</h3>
                        <ButtonList buttonList = {providerList}/>
                    </div>
                    
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
                            <ButtonList buttonList = {regProviderList}/>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};
export default Login;