//----------------- Import Modules --------------------------
import React, { useMemo } from 'react';

//----------------- Import Components --------------------------
// Product Detail Component
import ProductDetail from '../../components/product/productDetail/ProductDetail';

//Product Data Component
import { useProductDetailData } from './productData'
import { useProductDetailEffect } from './prductEffectHook'

//Cart Data Component
import { useCartItemStates } from '../cart/cartStates'
import { useCartListData } from '../cart/cartData'
import { useProductCartHandlers } from '../cart/cartHandlers'
import { useCartItemEffect, useCartListEffect } from '../cart/cartEffectHook'




//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {



    // Cart Item States
    const cartItemStates = useCartItemStates();

    // Cart States
    const cartListData = useCartListData();

    //Handle the cart data
    const cartHandlers = useProductCartHandlers({ cartItemStates });

    // Data to export to the ProductDetail component
    const productData = useProductDetailData({ cartItemStates, cartHandlers });


    //-------------------- Product Detail Effect Hook --------------------
    // Product Detail Effect Hook
    useCartListEffect();
    useProductDetailEffect({ cartItemStates });
    useCartItemEffect({ cartItemStates, cartListData });


    return (
        <ProductDetail {...productData} />
    );
};

export default ProductDetailContainer;