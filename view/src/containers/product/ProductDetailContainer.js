//----------------- Import Modules --------------------------
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


//----------------- Import Components --------------------------
// Product Detail Component
import ProductDetail from '../../components/product/productDetail/ProductDetail';

//Product Data 
import useProductDetailData from './productDetailData';


//Cart Data Component
import { useCartItemStates } from '../cart/cartStates'
import { useCartListData } from '../cart/cartData'
import { useProductCartHandlers } from '../cart/cartHandlers'

import useCounterData from '../cart/counterData';
import useUpdateCartItemData from '../cart/updateCartItemData';
import useProductCartUpdateData from './cartItemUpdate';
import { fetchCartListAndSync } from '../../features/cart/cartSlice';


//Authentication Slice
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';



//------------------ ProductDetail Container ---------------------

const ProductDetailContainer = () => {

    //Get the product_id from the URL
    const { product_id } = useParams();

    // Response to authentification status change
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated); 
    useEffect(()=>{
        if(isAuthenticated){
            //Fetch Cart List
            dispatch(fetchCartListAndSync());
        }
    },[isAuthenticated])

    // Import the custom hook for data generation 
    const productDetailPageData = useProductDetailData(product_id); 
    const productDetail = productDetailPageData.productDetailData; 
    const productDetailFetchingData = productDetailPageData.productDetailFetchingData;

    const counterData = useCounterData(productDetail);
    
    const updateCartItemData = useUpdateCartItemData(productDetail, counterData);

    const updateCartItemInProductData = useProductCartUpdateData(updateCartItemData);


    return (
        <ProductDetail
            productDetailData={productDetail}
            productDetailFetchingData={productDetailFetchingData}
            counterData={counterData}
            updateCartItemData={updateCartItemData}
            updateCartItemInProductData={updateCartItemInProductData}
        />
    );
};

export default ProductDetailContainer;