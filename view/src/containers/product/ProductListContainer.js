// ------------------------------- Import Modules ------------------------------ //
import React from 'react';
// ----------------------------- Import Components ----------------------------- //
import ProductList from '../../components/product/productList/ProductList'; //Import ProductList component
import { useParams } from 'react-router-dom';

import useProductListData from './ProductListData';


// ----------------------------- Product List Containers ----------------------------- //

const ProductListContainer = () => {

    // ----------------------------- Product List Page States ----------------------------- //
    const { category_id } = useParams();
    // ----------------------------- Product List Data ----------------------------- //
    const ProductListData = useProductListData(category_id);
    const { productListData, fetchingStatusData } = ProductListData;

    return <ProductList
        productList={productListData}
        fetchDataStatus={fetchingStatusData}
    />

};

export default ProductListContainer;