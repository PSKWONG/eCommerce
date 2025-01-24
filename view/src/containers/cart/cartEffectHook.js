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
    const {cartItemStates,cartListData} = data;
    const {
        isExist,setIsExist,
        isPendingRemoval,setIsPendingRemoval,
        setCommand,
        count,setCount,
        cartItem, setCartItem, 
        isUpdated,setIsUpdated
    } = cartItemStates;

    const cartList = cartListData.items ;
    const productId = cartItem.product_id;
    console.log('This is the cartList:',cartList);
    console.log('This is the cartItem:',cartItem);

    
    //Reset states from th existing product
    useEffect(() => {
        setCount(0);
        setIsExist(false);
        setIsPendingRemoval(false);
        setIsUpdated(true);
    }, [productId]);

    
    //Set the initial value for the cart item
    useEffect(() => {
        
        //Check if the product is in the cart----------------------------------------
        const result = cartList.find((item) => {
            return item.product_id == cartItem.product_id
        });


        //If the cart item is found, set the cart item
        if (result) {
            setIsExist(true);
            setCartItem(result);
        }else{
            const newCartItem = {...cartItem, quantity: 0};
            setCartItem(newCartItem);
        }

        
    }, [cartList, productId]);


    useEffect(() => {
        // To Check whether the product is pending to remove -------------------------
        if (isExist) {
            const initialQuantity = Number(cartItem.quantity);
            console.log('This is the cartItem:',cartItem);
            if (initialQuantity === 0) {
                setIsPendingRemoval(true);
            }
        }

    }, [isExist]);

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

    }, [isExist, isPendingRemoval]);


    //Check whether the Quantity has been updated
    useEffect(()=>{
        const quantity = Number(cartItem.quantity);
        const isUpdated = quantity == count;

        setIsUpdated(isUpdated);
    },[count, cartItem]);

    // Set the Command for the Cart Item
    useEffect(() => {

        switch (true) {
            case isExist && isPendingRemoval:
                setCommand('Add to Cart');
                break;
            case isExist && !isPendingRemoval && !isUpdated:
                setCommand('Update the cart');
                break;

            case isExist && !isPendingRemoval && isUpdated:
                setCommand('Updated');
                break;

            default:
                setCommand('Add to Cart');
        }
    }, [isExist, isPendingRemoval, isUpdated ]);

}