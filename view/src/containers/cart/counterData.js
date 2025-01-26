//------------------------ Import Modules --------------------------
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartData } from '../../features/cart/cartSlice';



const useCounterData = (cartItemData)=>{


    //---------------------- Counter States ----------------------//
    const [cartItem, setCartItem] = useState(cartItemData);
    const [count, setCount] = useState(0);

    const cartListData = useSelector(selectCartData); 

    //----------------------Actions ----------------------//
    //Reset the cartItem and count when the cartItemData is updated
    useEffect(()=>{
        setCartItem(cartItemData);
        setCount(0); 
    }, [cartItemData]);

    //Check for quantity of cart item
    useEffect(()=>{
        const productID = cartItem.product_id;
        const cartList = cartListData.items;

        //Check whether the cartItem in the updated cartList 
        const result = cartList.find((item) => {
            return item.product_id == productID
        });

        if(result){
            setCount(Number(result.quantity));
            return; 
        }

    }, [cartListData,cartItem]);

    //---------------------- Counter Handlers ----------------------//
    //Handler for incrementing the count 
    const handleIncrement = (e) => {
        e.preventDefault();
        if (count >= 0) {
            setCount(count + 1);
        }
    };

    //Handler for decrementing the count
    const handleDecrement = (e) => {
        e.preventDefault();
        if (count > 0) {
            setCount(count - 1);
        }
    };

    //---------------------- Counter Data ----------------------//
    return {
        count,
        actions:{
            handleIncrement,
            handleDecrement
        }
    }
}; 

export default useCounterData;