//----------- Import Modules ------------------------------
import React, { useMemo } from 'react';

// ------------------------------ Import Components ------------------------------
import facebookIcon from '../../assets/images/facebookIcon.png';




const useProviderLoginData = (login) => {
    const loginProviderData = useMemo(() => (
        {
            providers: [
                {
                    image: facebookIcon,
                    url: '/external/authen/login/facebook',
                    description: 'Facebook',
                    alt: 'Login with Facebook',
                }
            ]
        }
    ), []);

    return loginProviderData;

};

export default useProviderLoginData;