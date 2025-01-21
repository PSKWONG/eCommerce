//--------------------------- Import Modules ---------------------------
import { useState } from "react";





// --------------------------- Import Components  ---------------------------




//------------------------- Quantity Counter States -------------------------
/*
export const useQtyCounterStates = () => {
    const [count, setCount] = useState(0);

    return { count, setCount };
}; 
*/

//------------------------- Cart Item  States -------------------------

export const useCartItemStates = () => {
    const [product_item, setProduct_item] = useState({});
    const [cartItem, setCartItem] = useState({});
    const [count , setCount] = useState(0);
    const [isExist, setIsExist] = useState(false);
    const [isPendingRemoval, setIsPendingRemoval] = useState(false);
    const [command, setCommand] = useState('add');
    

    return { 
        product_item, setProduct_item,
        cartItem, setCartItem,
        count, setCount,
        isExist, setIsExist,
        isPendingRemoval, setIsPendingRemoval,
        command, setCommand
    };
} 