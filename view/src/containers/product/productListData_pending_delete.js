//--------------------- Import Modules ---------------------
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductList, setCategroyFiltering, selectProductList, selectProductFetchingStatus } from "../../features/productInfo/productInfoSlice";






const useProductListData = (category_id) => {

    const productList = useSelector(selectProductList); //Get the productList from the store
    const fetchDataStatus = useSelector(selectProductFetchingStatus); //Get the fetchDataStatus from the store

    const loadingStatus = useSelector(selectProductFetchingStatus); //Get the loadingStatus from the store

    // Log the productList whenever it changes
    useEffect(() => {
        console.log('Updated productList:', productList);
    }, [loadingStatus]);
    


    //--------------------- Hook Functions ---------------------
    //Set Custom Actions 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(()=>{
        //Check if the category_id is valid
        const isValidCategoryID = !isNaN(category_id);

        //Condition 1 - Valid category_id, user will get the product list
        if(isValidCategoryID){
            console.log('category_id:', category_id);
            dispatch(setCategroyFiltering(category_id)); //Set the category_id in the store
            dispatch(fetchProductList()); //Fetch the product list from the server   
        }
        //Condition 2 - Invalid category_id, user will redirect to the home page
        navigate('/'); 
        return;
    }, [category_id, dispatch]);
    
    //--------------------- Export Data ---------------------

     //Get the productList from the store
    const productListData = useMemo(()=>{
        return productList
    },[productList]);
    

    //Get the fetchDataStatus from the store
    const fetchDataStatusData = useMemo(()=>{
        return fetchDataStatus
    }, [fetchDataStatus])


    return { productListData, fetchDataStatusData };


};

export default useProductListData;