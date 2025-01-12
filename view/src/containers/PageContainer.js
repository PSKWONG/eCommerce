//-------------------------- Import Modules --------------------------
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";

// ----------------------- Import components -----------------------
import Page from "../components/page/Page";


//------------------------ Import Actions ------------------------
//dispatch actions

import { checkAuth } from "../features/authentication/authenticationSlice";

// ----------------------- Import Selectors -----------------------


// ----------------------- Page Container -----------------------
const PageContainer = () => {
  //Dispatch Action
  const dispatch = useDispatch();

  //Component States
  const [authenticatingState, setauthenticatingState] = useState(false);

  //Component Effect Hooks
  /*
  useEffect( async()=>{
    const isAuthenticated = await dispatch(checkAuth());
    setauthenticatingState(isAuthenticated); 
  }, [dispatch]  )
  */

  //Page States Props
  const pageStates = {
    authenticatingState: authenticatingState,
  };

  return (
    <Page {...pageStates} />
  );
};

export default PageContainer;