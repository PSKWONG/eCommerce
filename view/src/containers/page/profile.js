//-------------- Import Modules --------------
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//-------------- Import Assets --------------
import userIcon from "../../assets/images/userIcon.png";
import styles from '../../components/page/page.module.css';



const useProfileIcon = (authenStatus) => {

    // Custom Actions
    const navigate = useNavigate();

    // Component Handlers
    const handleProfile = () => { navigate("/user"); };

    // Component States
    const [profileIcon, setProfileIcon] = useState(
        {
            iconImage: userIcon,
            alt: "Profile",
            style: styles.hide,
            action: handleProfile
        }
    );

    //Update the profileIcon based on the authenStatus
    useEffect(() => {
        setProfileIcon(
            {
                iconImage: userIcon,
                alt: "Profile",
                style: authenStatus ? styles.show : styles.hide,
                action: handleProfile
            }
        );
    }, [authenStatus]);

    return profileIcon;
};

export default useProfileIcon;