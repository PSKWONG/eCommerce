//-------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';

// ------------------------------ Import Components ------------------------------
import Login from '../components/login/Login';

//Assets
import emailIcon from '../assets/images/emailIcon.png';

// ------------------------------ Login Container ------------------------------



//Login Content Container

const lgoinPageContent ={
    registration:{
        option:[
            {   
                image: emailIcon,
                description: 'Email',
                alt: 'Register with Email',
                action: '' //Link to registration page
            }
        ]
    }
}

const LoginContainer = () => {
    return (
        <Login {...lgoinPageContent} />
    );
}; 
export default LoginContainer;

