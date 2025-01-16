// --------------------- Import Modules ---------------------
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";




//------------------------ Effect Hooks ------------------------//



const useEffectHook = (states) => {
    const {
        password,
        confirmPassword,
        isValidUsername,
        isValidEmail,
        isValidPassword,
        setIsFormCompleted,
        setConfirmPassword,
        setIsValidConfirmPassword,
    } = states;

    //Custom Actions
    //Naviagtion
    const navigate = useNavigate(); 
    //Selector for stores 
    const authenStatus = useSelector(selectIsAuthenticated);

    // When user is authenticated, redirect to the home page
    useEffect(() => {
        if (authenStatus) {
            navigate('/');
        }
    }, [authenStatus, navigate]);

    //Reset Confirmed Password when password is changed
    useEffect(() => {
        setConfirmPassword('');
        setIsValidConfirmPassword();
    }, [password, setConfirmPassword, setIsValidConfirmPassword]);

    //Reset confirmed password when confirm password is changed
    useEffect(() => {
        setIsValidConfirmPassword();
    }, [confirmPassword, setIsValidConfirmPassword]);

    //Check if the form is completed
    useEffect(() => {
        const isCompleted = isValidUsername && isValidEmail && isValidPassword ? true : false;
        setIsFormCompleted(isCompleted);
    }, [isValidUsername, isValidEmail, isValidPassword, setIsFormCompleted]);


};

export default useEffectHook;