//-------------------------- Import Modules --------------------------
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// ----------------------- Import components -----------------------
import Page from "../components/page/Page";


//------------------------ Import Actions ------------------------
//dispatch actions

import { checkAuth, selectIsAuthenticated } from "../features/authentication/authenticationSlice";
// ----------------------- Import Selectors -----------------------


// ----------------------- Page Container -----------------------
const PageContainer = () => {
  //Dispatch Action
  const dispatch = useDispatch();

  //Component States
  const authenStatus = useSelector(selectIsAuthenticated);

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
  

  //Page States Props
  const pageStates = {
    authenticatingState: authenStatus,
  };

  return (
    <Page {...pageStates} />
  );
};

export default PageContainer;