// -------------------------- Import Modules  --------------------------
import React, { useEffect, useMemo } from 'react';


///-------------------------- Import Components  --------------------------
import CartItem from '../../components/cart/cartItem/cartItem';
//Counter Data
import useCounterData from './counterData';

//Update Cart Item Data
import useUpdateCartItemData from './updateCartItemData';
import useCartListItemControllerData from './CartListItemControllerData';

// ----------------------- Cart Item Container  -----------------------

const CartItemContainer = (data) => {

    //----------------------Imported Data ----------------------
    //Extract cart Item Data
    const cartItemData = data.cartItemData || {}; 
    const {cartListProgress} = data.cartItemControllerData.progressGuideline || 1;

    //Counter Data
    const counterData = useCounterData(cartItemData);

    //Update cart item data
    const updateCartItemData = useUpdateCartItemData(cartItemData, counterData);

    // Cart Item Container controller data 
    const cartItemControllerData = useCartListItemControllerData(updateCartItemData, cartListProgress);



    return <CartItem 
        cartItemData = {cartItemData}
        counterData = {counterData}
        cartItemControllerData = {cartItemControllerData}
    />;
}
export default CartItemContainer;