//-------------------------- Import Modules ------------------------------
//Core Modules
import React from 'react';

// ------------------------------ Import Components ------------------------------
import Login from '../../components/login/Login';

import useFormInputData from './formInput';
import useProviderLoginData from './loginProvider';
import useRegProviderData from './regProvider';

// ------------------------------ Login Container ------------------------------

const LoginContainer = () => {

   // useLoginEffect(loginStates);
    const localLoginFormData = useFormInputData();
    const ProviderLoginData = useProviderLoginData();
    const regProviderData = useRegProviderData();

    return (
        <Login
            localLoginFormData={localLoginFormData}
            loginProviderData={ProviderLoginData}
            regProviderData = {regProviderData}
        />
    );
};
export default LoginContainer;

