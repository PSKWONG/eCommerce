//----------------- Import Modules --------------------------
import React , {useMemo} from 'react';

//----------------- Import Components --------------------------
// Product Detail Component
import ProductDetail from '../../components/product/productDetail/ProductDetail';

import { useProductStates } from './productStates'
import {useProductDetailData} from './productData'
import { useProductDetailEffect } from './prductEffectHook'
//Cart Data Component
import useCartData from '../cart/cartData'
// Quantity Counter Component
import { useQtyCounterStates } from '../cart/cartStates'
import { useQtyCounterEffect } from '../cart/cartEffectHook'


//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    // Product States 
    const productStates = useProductStates();
    useProductDetailEffect({ productStates });

    // Cart States
    const countStates = useQtyCounterStates();
    const countData = useCartData();
   
    useQtyCounterEffect(
        {
            product_id: productStates.product_id,
            setIsExist: productStates.setIsExist,
            setCount: countStates.setCount,
            cartItems: countData.cartItems
        }
    );

    // Data to export to the ProductDetail component
    const productData = useProductDetailData({productStates,countStates} );

    return (
        <ProductDetail {...productData} />
    );
};

export default ProductDetailContainer;