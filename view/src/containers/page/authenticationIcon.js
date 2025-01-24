//-------------------------Import Modules-------------------------
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



//-------------------------Import Assets-------------------------
import loginBtn from '../../assets/images/loginBtn.png';
import logoutIcon from '../../assets/images/logoutIcon.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authentication/authenticationSlice';






const useAuthenticationIcon = (authenStatus) => {

    //-------------------------Define Actions and States-------------------------
    //Custom Actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Control the login and logout actions 
    const handleLogin = () => { navigate("/login"); };
    const handleLogout = async () => {
        await dispatch(logout(navigate));
    };

    // Set the default value for Authentication Button
    const [authenticationButton, setAuthenticationButton] = useState({
        iconImage: loginBtn,
        alt: "Login",
        action: handleLogin,
    });

    // Update the Authentication Button based on the authentication status
    useEffect(() => {
        setAuthenticationButton({
            iconImage: authenStatus ? logoutIcon : loginBtn,
            alt: authenStatus ? "Logout" : "Login",
            action: authenStatus ? handleLogout : handleLogin,
        })
    }, [authenStatus])


    return authenticationButton
};

export default useAuthenticationIcon;
