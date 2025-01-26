//----------------- Import Modules --------------------------
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductDetail, selectProductDetail, selectProductFetchingStatus } from '../../features/productInfo/productInfoSlice';



const useProductDetailData = (data)=>{

    const [productID, setProductID] = useState();
    const [isValid, setIsValid] = useState(false);


    //---------------------Actions ---------------------
    //Custom Actions
    const navigate = useNavigate();
    const dispatch = useDispatch();


    //Check the product_id
    //If the product_id is not valid, redirect to the home page
    //If the product_id is valid, set the productID states
    useEffect(()=>{

        console.log('This is the data I got from product_id:', data);
        const isValidProductID = !isNaN(data);
        setIsValid(isValidProductID);

        if(isValidProductID){
            data = Number(data);
            setProductID(data);
            return; 
        }else{
            navigate('/');  //Redirect to the home page
            return; 
        }
    }, [data]); 

    //Avoid Initial Render API Calling
    useEffect(()=>{
        if(isValid){
            dispatch(fetchProductDetail(productID));
        }
    }, [isValid]); 

    //------------------ Export Product Detail Data ---------------------
    const productDetail = useSelector(selectProductDetail); 

    const productDetailData = useMemo(()=>{
        return productDetail
    }, [productDetail]);

    const fetchDataStatus = useSelector(selectProductFetchingStatus); 

    const productDetailFetchingData = useMemo(()=>{
        return fetchDataStatus
    }, [fetchDataStatus]);


    return {productDetailData, productDetailFetchingData};
}; 

export default useProductDetailData;