//------------------ Import Modules ------------------
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectIsAuthenticated} from  "../../features/authentication/authenticationSlice";
import { fetchCartListAndSync } from "../../features/cart/cartSlice";
//------------------- Cart List Effect Hook -------------------
export const useCartListEffect = (data) => {

    const isAuthenticated = useSelector(selectIsAuthenticated); 
    //Custom Actions
    const dispatch = useDispatch(); 

    useEffect(()=>{
        if(isAuthenticated){
            //Fetch Cart List
            dispatch(fetchCartListAndSync());
        }
    }, [isAuthenticated]);   
    
}; 


//------------------- Cart Item Effect Hook -------------------
export const useCartItemEffect = (data) => {
    const { cartItemStates, cartListData } = data;
    const {
        product_item,
        isExist,
        setIsExist,
        isPendingRemoval,
        setIsPendingRemoval,
        setCommand,
        setCount,
        cartItem, setCartItem
    } = cartItemStates;

    const cartList = cartListData.items


    //Reset states from th existing product
    useEffect(() => {
        setCount(0);
        setCartItem({});
        setIsExist(false);
        setIsPendingRemoval(false);
    }, [product_item]);


    //Check the Cart List for the existing product
    useEffect(() => {

        //Check if the product is in the cart
        const result = cartList.find((item) => {
            return item.product_id == product_item.product_id
        });

        //If the cart item is found, set the cart item
        if (result) {
            setCartItem(result);
            setIsExist(true);
        }


    }, [product_item, cartList, cartItem]);



    //Check whether products are pending for removal
    useEffect(() => {
        if (isExist) {
            const initialQuantity = Number(cartItem.quantity);
            if (initialQuantity === 0) {
                setIsPendingRemoval(true);
            }
        }
    }, [isExist]);


    // Set Initial Value for the Counter 
    useEffect(() => {

        const initialQuantity = Number(cartItem.quantity);

        switch (true) {

            case isPendingRemoval:
                setCount(0);
                break;
            case isExist && !isPendingRemoval:
                setCount(initialQuantity);
                break;
            default:
                setCount(0);
        }
    }, [isExist, isPendingRemoval, cartItem]);


    // Set the Command for the Cart Item
    useEffect(() => {

        switch (true) {
            case isExist && isPendingRemoval:
                setCommand('Add to Cart');
                break;
            case isExist && !isPendingRemoval:
                setCommand('update');
                break;
            default:
                setCommand('Add to Cart');
        }
    }, [isExist, isPendingRemoval]);

}