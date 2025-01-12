//-------------------------- Import Modules --------------------------
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

// ----------------------- Import components -----------------------
import Page from "../components/page/Page";
//Assets 
import loginBtn from '../assets/images/loginBtn.png';
import userIcon from '../assets/images/userIcon.png';


//------------------------ Import Actions ------------------------
//dispatch actions
import { checkAuth, selectIsAuthenticated } from "../features/authentication/authenticationSlice";
// ----------------------- Import Selectors -----------------------


// ----------------------- Page Container -----------------------
const PageContainer = () => {
  //Dispatch Action
  const dispatch = useDispatch();

  //Component Effect Hooks
  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        await dispatch(checkAuth());
      } catch (error) {
        console.log(error);
      }
    };
    getAuthStatus();
  }, [dispatch]);

  // Component Actions 
  const navigate = useNavigate();
  const handleLogin = () => { navigate("/authen/login"); };
  const handleProfile = () => { navigate("/user/profile"); };
  

  // Compoent States  
  const authenStatus = useSelector(selectIsAuthenticated);

  // Component Object Constructor


  const pageStates = {
    userIcon:{
      iconImage: authenStatus? userIcon : loginBtn,
      alt: authenStatus? "User Profile" : "Login",
      action: authenStatus? handleProfile : handleLogin
    }
  };

  return (
    <Page {...pageStates} />
  );
};

export default PageContainer;