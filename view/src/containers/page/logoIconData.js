// ---------------- Import Modules ----------------
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



// ---------------- Logo Icon Data ----------------


const useLogoData = ()=>{

    const [logoIcon, setLogoIcon] = useState({});

    const navigate = useNavigate();
    const handleHome = () => { navigate("/"); };

    //Set the default value for LogoIcon
    useEffect(()=>{
        setLogoIcon(
            {
                action: handleHome
            }
        );
    },[]);


    return logoIcon ; 
    
}; 

export default useLogoData;