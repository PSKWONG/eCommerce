//---------------------------- Import Modules ------------------------------//
import React  from 'react';


// ----------------------------- Import Components ----------------------------- //
import { useSelector } from 'react-redux';
import { selectProductList, selectProductFetchingStatus } from '../../../features/productInfo/productInfoSlice'; 


// ----------------------------- Product Data Component  ----------------------------- //

const useProductListData = () => { //Create a functional component named ProductListData 
    //Get the productList and fetchDataStatus from the store
    const productList = useSelector(selectProductList); //Get the productList from the store
    const fetchDataStatus = useSelector(selectProductFetchingStatus); //Get the fetchDataStatus from the store

    console.log('This is the productLists:',productList);
    console.log('This is the fetchDataStatus:',fetchDataStatus);

    const productData = {
        productList,
        fetchDataStatus
    }
    

    //Return the productList
    return productData;

}; 

export default useProductListData; //Export the ProductListData component