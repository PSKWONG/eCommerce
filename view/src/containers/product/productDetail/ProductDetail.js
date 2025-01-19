//----------------- Import Modules --------------------------
import React from 'react';

//----------------- Import Components --------------------------
import ProductDetail from '../../../components/product/productDetail/ProductDetail';
import useProductData from '../productList/productListData'
import useProductDetailEffect from './prductDetailEffectHook';



//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    const productData = useProductData();
    useProductDetailEffect();



    return (
        <ProductDetail {...productData} />
    );
}; 

export default ProductDetailContainer;