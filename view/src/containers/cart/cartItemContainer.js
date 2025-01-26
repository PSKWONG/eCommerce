// -------------------------- Import Modules  --------------------------
import React, { useEffect, useMemo } from 'react';


///-------------------------- Import Components  --------------------------
import CartItem from '../../components/cart/cartItem/cartItem';
import { useCartItemStates } from '../../containers/cart/cartStates';
import { useCartItemEffect } from '../../containers/cart/cartEffectHook';
import { useCartListData, useCartItemData } from '../../containers/cart/cartData';
import { useProductCartHandlers } from './cartHandlers';
//Counter Data
import useCounterData from './counterData';

//Update Cart Item Data
import useUpdateCartItemData from './updateCartItemData';
import useCartListItemControllerData from './CartListItemControllerData';

// ----------------------- Cart Item Container  -----------------------

const CartItemContainer = (data) => {

    //----------------------Imported Data ----------------------
    //Extract cart Item Data
    const cartItemData = data.cartItem || {}; 

    //Counter Data
    const counterData = useCounterData(cartItemData);

    //Update cart item data
    const updateCartItemData = useUpdateCartItemData(cartItemData, counterData);

    // Cart Item Container controller data 
    const cartItemControllerData = useCartListItemControllerData(updateCartItemData);



    return <CartItem 
        cartItemData = {cartItemData}
        counterData = {counterData}
        cartItemControllerData = {cartItemControllerData}
    />;
}
export default CartItemContainer;