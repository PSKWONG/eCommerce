// --------------------------- Imoport Modules ---------------------- 
import React from 'react';


// --------------------------- Import Components ----------------------
import CartList from '../../components/cart/cartList/CartList';
import {useCartListData} from '../../containers/cart/cartData';

//Cart List Components 
import { useCartListEffect } from './cartEffectHook';


// --------------------------- CartListContainer ----------------------
const CartListContainer = () => {

    // Cart List Data
    const cartListData = useCartListData();

    // Effect Hook
    useCartListEffect();

    return (
        <CartList {...cartListData}/>
    )
}

export default CartListContainer;