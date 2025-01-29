//--------------Import Modules-------------------

import { getUser } from "../../features/api/API";
import { useNavigate } from 'react-router-dom';
import { useSelect } from 'react-redux';
import { useEffect, useState } from "react";





const useProfileData = () => {

    const [profileData, setProfileData] = useState({});

    //---------------------------- Actions ---------------------------

    // Get user profile data
    useEffect(() => {

        const getProfileData = async () => {
            try {
                const response = await getUser();
                const userData = response.data.users[0];

                console.log('User profile data:', userData);

                setProfileData(userData);
                return;

            } catch (error) {
                console.error('API error on getting user profile:', error);
                return error;
            }
        };

        getProfileData();
    }, [])

    //---------------------------- Actions ---------------------------
    return {
        profileData
    };

}

export default useProfileData;