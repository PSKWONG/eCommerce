//-------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ------------------------------ Import Components ------------------------------
import Login from '../components/login/Login';

//Assets
import emailIcon from '../assets/images/emailIcon.png';

// ------------------------------ Login Container ------------------------------



const LoginContainer = () => {

    // ------------------- Helper functions
    //Navigation
    const navigate = useNavigate();
    const handleRegistration = () => { navigate("/register"); };

    //Login Content Container
    const lgoinPageContent = {
        registration: {
            option: [
                {
                    image: emailIcon,
                    description: 'Email',
                    alt: 'Register with Email',
                    action: handleRegistration 
                }
            ]
        }
    }



    return (
        <Login {...lgoinPageContent} />
    );
};
export default LoginContainer;

