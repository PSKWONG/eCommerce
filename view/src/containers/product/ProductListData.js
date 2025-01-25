import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductList, setCategroyFiltering, selectProductList, selectProductFetchingStatus } from "../../features/productInfo/productInfoSlice";


const useProductListData = (data) => {

    //------------------- Declare the states -------------------//
    const [categoryID, setCategoryID] = useState();
    const [isValidID, setIsValidID] = useState(false);


    //------------------- Actions -------------------//
    //Set Custom Actions
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //Set the categoryID to the store when the categoryID is received
    useEffect(() => {
        //Check the categoryID is valid
        const isValidCategoryID = data && !isNaN(data);

        if (isValidCategoryID) {
            data = Number(data);
            setCategoryID(data);
            setIsValidID(true);
            return;
        } else {
            setIsValidID(false);
            navigate('/'); //Redirect to the home page
            return;
        }
    }, [data])

    //Set the categoryID to the store when the categoryID is received
    useEffect(() => {
        if (isValidID) {
            dispatch(setCategroyFiltering(categoryID));
        }
    }, [categoryID, isValidID]);

    //Fetch the product list from the store
    useEffect(() => {
        if (isValidID) {
            dispatch(fetchProductList());
        }
    }, [categoryID, isValidID]);

    //------------------- Export Data -------------------//
    const productList = useSelector(selectProductList);
    const fetchDataStatus = useSelector(selectProductFetchingStatus);

    const productListData = useMemo(()=>{
        return productList;
    }, [productList]);

    const fetchingStatusData = useMemo(()=>{
        return fetchDataStatus;
    }, [fetchDataStatus]);

    return {productListData, fetchingStatusData};

};

export default useProductListData;