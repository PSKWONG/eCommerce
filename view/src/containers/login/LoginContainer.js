//-------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';

// ------------------------------ Import Components ------------------------------
import Login from '../../components/login/Login';
import useLoginData from './loginData';
import useStates from './loginStates';
import useLoginHandlers from './loginHandlers';

// ------------------------------ Login Container ------------------------------

const LoginContainer = () => {
    const loginStates = useStates();
    const loginHandlers = useLoginHandlers(loginStates);
    const lgoinPageContent = useLoginData(loginStates, loginHandlers);

    console.log('This is the login Data:', lgoinPageContent);
    

    return (
        <Login {...lgoinPageContent} actions = {loginHandlers} />
    );
};
export default LoginContainer;

