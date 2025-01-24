//------------------------- Import Modules -------------------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const useCartIcon = () => {

    //Custom Actions
    const navigate = useNavigate(); 
    const handleCart = () => { navigate("/cart"); };

    //Component States
    const [cartIcon, setCartIcon] = useState({
        actions: handleCart
    });

    return cartIcon;
}; 

export default useCartIcon;