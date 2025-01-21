//---------------------------- Import Modules ------------------------------//
import React from 'react';


// ----------------------------- Import Components ----------------------------- //
import { useSelector } from 'react-redux';
import { selectProductList, selectProductFetchingStatus, selectProductDetail } from '../../features/productInfo/productInfoSlice';


// ----------------------------- Product Data Component  ----------------------------- //

const useProductListData = () => { //Create a functional component named ProductListData 
    //Get the productList and fetchDataStatus from the store
    const productList = useSelector(selectProductList); //Get the productList from the store
    const fetchDataStatus = useSelector(selectProductFetchingStatus); //Get the fetchDataStatus from the store


    // console.log('This is the productLists:',productList);
    // console.log('This is the fetchDataStatus:',fetchDataStatus);
    // console.log('This is the productDetail:',productDetail);

    const productData = {
        productList,
        fetchDataStatus
    }


    //Return the productList
    return productData;

};

export default useProductListData; //Export the ProductListData component


export const useProductDetailData = (data) => { //Create a functional component named ProductDetailData  
    
    const { cartItemStates, cartHandlers } = data; //Get the cartItemStates and cartHandlers from the data
    const productDetail = useSelector(selectProductDetail); //Get the productDetail from the store
    const fetchDataStatus = useSelector(selectProductFetchingStatus); //Get the fetchDataStatus from the store

    console.log('This is the ProductDetailData:');

    return (
        {
            productDetail,
            cartStates: {
                cartItemStates,
                cartHandlers
            },
            fetchDataStatus
        }
    )

};     