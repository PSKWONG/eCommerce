// ---------------------------- Import Modules ------------------------------//
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------- Import Components ----------------------------- //






// ----------------------------- Product Data Slice   ----------------------------- //

const productInfoSlice = createSlice({
    name: 'productInfo', //Slice name
    initialState: { //Initial state
        productList:{
            data: [],
            catergory: 0,
            totalItems: 0,
            displayItems: 25, 
            currentPage: 1,
            totalPages: 1
        }, 
        catergoryList: {
            data: []
        }, //catergoryList property
        productDetail:{},
        fetchDataStatus:{
            isLodaing: false, 
            isError: false
        }
    },
    reducers: { //Reducers
        setProductInfo: (state, action) => { //setProductInfo reducer
            state.productInfo = action.payload; //Set the productInfo property to the payload
        }
    }
}); 

export default productInfoSlice.reducer; //Export the productInfoSlice reducer


