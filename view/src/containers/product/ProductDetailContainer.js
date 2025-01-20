//----------------- Import Modules --------------------------
import React from 'react';

//----------------- Import Components --------------------------
// Product Detail Component
import ProductDetail from '../../components/product/productDetail/ProductDetail';
import useProductData from './productData'
import { useProductDetailEffect } from './prductEffectHook'
// Quantity Counter Component
import { useQtyCounterStates } from '../cart/cartStates'


//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    const productData = useProductData();
    useProductDetailEffect();
    const countData = useQtyCounterStates();



    return (
        <ProductDetail {...productData} countData={countData} />
    );
};

export default ProductDetailContainer;