// ---------------------------- Import Modules ------------------------------//
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductList } from '../api/API';

// ----------------------------- Import Components ----------------------------- //


// ----------------------------- Async Thunk Actions ----------------------------- //

const fetchProductList = createAsyncThunk( //Create a fetchProductList async thunk
    'productInfo/fetchProductList', //Slice name
    async (params, thunkAPI) => { //Async function

        const state = thunkAPI.getState(); //Get the state
        const category_id = state.productInfo.productList.catergroy; //Get the category_id from the state

        //Make call to the server
        try{
            const response = await getProductList(category_id); //Get the response from the server
            console.log(response);
            const productList = response.data.products; //Get the products from the response
            return productList; //Return the response
        }catch(err){
            console.log('There is Error in handling fetchProductList:', err);
        }   
      
    }
);


// ----------------------------- Product Data Slice   ----------------------------- //

const productInfoSlice = createSlice({
    name: 'productInfo', //Slice name
    initialState: { //Initial state
        productList:{
            data: [],
            catergroy: 0,
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
        },
        setCategroyFiltering: (state, action) => { //setCategroyFiltering reducer\
            state.productList.catergroy = action.payload; //Set the catergroy property to the payload
        }, 
        setDisplayItems: (state, action) => { //setDisplayItems reducer 
            state.productList.displayItems = action.payload; //Set the displayItems property to the payload
        }
    }, 
    extraReducers: (builder) => { //Extra reducers
        builder
            .addCase(fetchProductList.pending, (state) => { //Add case for pending fetchProductList
                state.fetchDataStatus.isLodaing = true; //Set the isLodaing property to true
                state.fetchDataStatus.isError = false; //Set the isError property to false
            })
            .addCase(fetchProductList.fulfilled, (state, action) => { //Add case for fulfilled fetchProductList
                state.fetchDataStatus.isLodaing = false; //Set the isLodaing property to false
                state.productList.data = action.payload; //Set the data property to the payload
                state.productList.totalItems = action.payload.length; //Set the totalItems property to the payload
                console.log('total product in list ' , action.payload.length);
            })
            .addCase(fetchProductList.rejected, (state) => { //Add case for rejected fetchProductList
                state.fetchDataStatus.isError = true; //Set the isError property to true
            })
    } 
}); 

// ----------------------------- Export Actions ----------------------------- //
export { fetchProductList }; //Export the fetchProductList async thunk
export const { setProductInfo, setCategroyFiltering } = productInfoSlice.actions; //Export the setProductInfo and setCategroyFiltering actions  

// ----------------------------- Export Selectors ----------------------------- //
export const selectProductList = (state) => state.productInfo.productList; //Export the selectProductList selector
export const selectProductFetchingStatus = (state) => state.productInfo.fetchDataStatus; //Export the selectProductListFetchingStatus selector  

// ----------------------------- Export Reducer ----------------------------- //
export default productInfoSlice.reducer; //Export the productInfoSlice reducer


