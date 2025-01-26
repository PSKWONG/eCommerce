//------------------------ Import Modules --------------------------
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addServerCartItem, selectCartData, updateCartItem, updateServerCartItem } from '../../features/cart/cartSlice';
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';




const useUpdateCartItemData = (cartItemData, countData) => {

    //---------------------- Counter States ----------------------//
    const [cartItem, setCartItem] = useState(cartItemData);
    const [isExist, setIsExist] = useState(false);
    const [isUpdated, setIsUpdated] = useState(true);
    const [isPendingRemoval, setIsPendingRemoval] = useState(false);

    //console.log('The Cart Item:', cartItem);

    //--------------------------------- External States  -------------------------------
    //Count Data
    const { count } = countData;
    //Cart List Data 
    const cartListData = useSelector(selectCartData);
    const cartList = cartListData.items;
    //authentication status
    const isAuthenticated = useSelector(selectIsAuthenticated) || false;


    //--------------------- Actions ---------------------
    //Update Cart Item if the cart item is updated
    useEffect(()=>{
        setCartItem(cartItemData);
        setIsExist(false);
        setIsUpdated(true);
        setIsPendingRemoval(false);
    }, [cartItemData]);


    //Check for latest cart item data
    useEffect(() => {

        console.log('Try to search the result. The Cart List:', cartList);
        const productID = cartItem.product_id;

        //Check whether the cartItem in the updated cartList 
        const result = cartList.find((item) => {
            return item.product_id == productID
        });
        const isExist = result ? true : false;
        setIsExist(isExist);

        if (result) {
            setCartItem(result);
            return;
        }

    }, [cartList, cartItem]);

    //Check the item whether pending for removal 
    useEffect(() => {
        if (isExist) {
            const quantity = Number(cartItem.quantity);
            const isPendingRemoval = quantity === 0 ? true : false;
            setIsPendingRemoval(isPendingRemoval);
        }
    }, [isExist, cartItem]);

    //Check the item whether updated
    useEffect(() => {
        if (isExist) {
            const quantity = Number(cartItem.quantity);
            const isUpdated = quantity === count ? true : false;
            setIsUpdated(isUpdated);
        }
    }, [count, isExist, cartList, cartItem]);

    //---------------------- Update Cart Item Handlers ----------------------//

    const dispatch = useDispatch();

    const handleUpdateCartItem = (e) => {

        e.preventDefault();
        let cartItemToUpdate = { ...cartItem };
        cartItemToUpdate.quantity = count || 0;

        //console.log('The Cart Item to Update:', cartItem);

        switch (true) {
            case isAuthenticated && !isExist:
                dispatch(addServerCartItem(cartItemToUpdate));
                break;
            case isAuthenticated && isExist:
                dispatch(updateServerCartItem(cartItemToUpdate));
                break;

            case !isAuthenticated && isExist:
                dispatch(updateCartItem(cartItemToUpdate));
                break;

            case !isAuthenticated && !isExist:
                dispatch(addItemToCart(cartItemToUpdate));
                break

            default:
                break;
        }
    };

    const handleDeleteCartItem = (e) => {
        e.preventDefault();
        if (isExist) {
            let cartItemToDelete = { ...cartItem };
            cartItemToDelete.quantity = 0;
            dispatch(updateCartItem(cartItemToDelete));
        }
    }

    //---------------------- Update Cart Item Data Export----------------------//
    
  

    const cartItemStatusData = useMemo(()=>({
        isExist,
        isUpdated,
        isPendingRemoval,
    }), [isExist, isUpdated, isPendingRemoval]);

    const cartItemUpdateHandlers = useMemo(()=>({
        handleUpdateCartItem,
        handleDeleteCartItem
    }), [handleUpdateCartItem, handleDeleteCartItem]);

    const updateCartItemData = {
        cartItemStatusData,
        cartItemUpdateHandlers
    }


    return updateCartItemData;

}; 

export default useUpdateCartItemData;