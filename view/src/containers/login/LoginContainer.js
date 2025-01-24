//-------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';

// ------------------------------ Import Components ------------------------------
import Login from '../../components/login/Login';
import useLoginData from './loginData';
import useStates from './loginStates';
import useLoginHandlers from './loginHandlers';
import useLoginEffect from './loginEffect';

import useFormInputData from './formInput';
import useProviderLoginData from './provider';

// ------------------------------ Login Container ------------------------------

const LoginContainer = () => {
    const loginStates = useStates();
    const loginHandlers = useLoginHandlers(loginStates);
    const lgoinPageContent = useLoginData(loginStates, loginHandlers);

   // useLoginEffect(loginStates);

    const localLoginFormData = useFormInputData();
    const localProviderLoginData = useProviderLoginData();

    return (
        <Login
            localLoginFormData={localLoginFormData}
            localProviderLoginData={localProviderLoginData}
            {...lgoinPageContent}
        />
    );
};
export default LoginContainer;

