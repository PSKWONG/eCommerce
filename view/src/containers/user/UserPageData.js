//------------- Import Modules -------------
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from '../../features/authentication/authenticationSlice';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




const useUserPageData = () => {

    //-------------------- States User Page Data --------------------

    const isAuthen = useSelector(selectIsAuthenticated); 


    //--------------------- Actions ---------------------------------
    const navigate = useNavigate(); 

    useEffect(()=>{
        if(!isAuthen){
            navigate("/login");
        }
    }, [isAuthen]);



    //----------------------- User Page Data ------------------------

    const menuData = [
        {
            title: "Profile",
            link: "/user/profile"
        }

    ]; 


    return {
        menuData
    }

}; 

export default useUserPageData;
