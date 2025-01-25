// ------------------------------- Import Modules ------------------------------ //
import React, { useEffect, useMemo, useState } from 'react';
// ----------------------------- Import Components ----------------------------- //
import ProductList from '../../components/product/productList/ProductList'; //Import ProductList component
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectProductList, fetchProductList } from '../../features/productInfo/productInfoSlice';
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