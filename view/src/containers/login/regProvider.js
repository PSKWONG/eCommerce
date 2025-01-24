//----------- Import Modules ------------------------------
import React, { useMemo } from 'react';

// ------------------------------ Import Components ------------------------------
import emailIcon from '../../assets/images/emailIcon.png';




const useRegProviderData = (login) => {
    const regProviderData = useMemo(() => (
        {
            providers: [
                {
                    image: emailIcon,
                    url: '/register',
                    description: 'Email',
                    alt: 'Register with Email',
                    isExternal: false
                }
            ]
        }
    ), []);

    return regProviderData;

};

export default useRegProviderData;