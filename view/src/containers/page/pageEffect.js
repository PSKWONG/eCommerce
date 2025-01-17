// ------------------------ Import Modules ------------------------
import {useEffect} from "react";
import { useDispatch } from "react-redux";


// ------------------------ Import Components ------------------------
import { checkAuth } from "../../features/authentication/authenticationSlice";





//----------------------------- Page Effect -----------------------------
const usePageEffect = (actions) => {
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
};
export default usePageEffect;