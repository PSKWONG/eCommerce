//-------------------- Import Modules --------------------------
import React from "react";
import { useSelector } from "react-redux";

// --------------------- Import Components ---------------------
import {selectCartData} from '../../features/cart/cartSlice'


//---------------------------- Cart Data Component ----------------------------


const useCartData = (props) => {

    const cartData = useSelector(selectCartData);
    const cartItems = cartData.items;

    return (
        {
            cartItems
        }
    );
};

export default useCartData;