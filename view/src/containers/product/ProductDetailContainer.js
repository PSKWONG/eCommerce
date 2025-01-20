//----------------- Import Modules --------------------------
import React from 'react';

//----------------- Import Components --------------------------
import ProductDetail from '../../components/product/productDetail/ProductDetail';
import useProductData from './productData'
import {useProductDetailEffect} from './prductEffectHook'


//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    const productData = useProductData();
    useProductDetailEffect();



    return (
        <ProductDetail {...productData} />
    );
}; 

export default ProductDetailContainer;