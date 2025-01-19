//----------------- Import Modules --------------------------
import React from 'react';

//----------------- Import Components --------------------------
import ProductDetail from '../../../components/product/productDetail/ProductDetail';
import useProductData from '../productList/productListData'



//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    const productData = useProductData();



    return (
        <ProductDetail {...productData} />
    );
}; 

export default ProductDetailContainer;