// --------------------------- Imoport Modules ---------------------- 
import React from 'react';


// --------------------------- Import Components ----------------------
import CartList from '../../components/cart/cartList/CartList';

//Cart List Components 
import { useCartListEffect } from './cartEffectHook';


// --------------------------- CartListContainer ----------------------
const CartListContainer = () => {



    // Effect Hook
    useCartListEffect();

    return (
        <CartList />
    )
}

export default CartListContainer;