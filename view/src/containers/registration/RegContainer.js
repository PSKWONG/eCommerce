// ------------------------ Import Modules --------------------------
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



// ------------------------ Import Components --------------------------
import RegPage from '../../components/registration/Registration';
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";
import useRegFormData from './regFormData';

// ------------------------ Registration Container --------------------------
const RegContainer = () => {

    //Selector for authentication status
    const authenStatus = useSelector(selectIsAuthenticated);

    //---------------------------------- Import Data ----------------------------------

    const regFormData = useRegFormData();
    const { regFormInputData, regFormSubmitData, regFormGuidelineData } = regFormData


    //---------------------------------- Effect Hook ----------------------------------
    //Custom Actions
    const navigate = useNavigate();

    // When user is authenticated, redirect to the home page
    useEffect(() => {
        if (authenStatus) {
            navigate('/');
        }
    }, [authenStatus, navigate]);


    return (
        < RegPage 
            regFormInputData={regFormInputData}
            regFormSubmitData={regFormSubmitData}
            regFormGuidelineData={regFormGuidelineData}
         />
    );
};

export default RegContainer;