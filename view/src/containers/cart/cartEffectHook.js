//------------------ Import Modules ------------------
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";















//------------------- Quantity Counter Effect  -------------------
export const useQtyCounterEffect = (data) => {

    const { product_id, setCount, cartItems, setIsExist } = data;
    const numOfcartItems = cartItems.length;


    useEffect(() => {
        console.log("Qty Effect triggered ");
        //Check if Shoppinf is empty
        
        if (numOfcartItems === 0) {
            setCount(0);
            return
        }
        
        //Check if the item is in the cart
        const result = cartItems.find((item)=>{
            return item.product_id == product_id
        })

        
        if (result) {
            setIsExist(true);
            setCount(result.quantity);
        } else {
            setCount(0);
        }
            
    }, [ product_id, cartItems]);

}; 