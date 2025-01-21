//-------------------- Import Modules --------------------------
import React, { useState } from "react";
import { useSelector } from "react-redux";

// --------------------- Import Components ---------------------
import {selectCartData} from '../../features/cart/cartSlice'


//---------------------------- Cart Data Component ----------------------------

/*
const useCartData = (props) => {

    const cartData = useSelector(selectCartData);

    return (
        {
            cartItems,
        }
    );
};

export default useCartData;
*/

export const useCartListData = ()=>{
    console.log('This is the cartListData:');
    const cartListData  = useSelector(selectCartData);

    return cartListData; 
}; 