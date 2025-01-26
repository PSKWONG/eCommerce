// ---------------------------- Import Modules ------------------------------//
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductList, getProductDetail } from '../api/API';

// ----------------------------- Import Components ----------------------------- //


// ----------------------------- Async Thunk Actions ----------------------------- //

const fetchProductList = createAsyncThunk( //Create a fetchProductList async thunk
    'productInfo/fetchProductList', //Slice name
    async (params, thunkAPI) => { //Async function

        const state = thunkAPI.getState(); //Get the state
        const category_id = state.productInfo.productList.catergroy; //Get the category_id from the state

        //Make call to the server
        try {
            const response = await getProductList(category_id); //Get the response from the server
            const productList = response.data.products; //Get the products from the response
            return productList; //Return the response
        } catch (err) {
            console.log('There is Error in handling fetchProductList:', err);
        }

    }
);

const fetchProductDetail = createAsyncThunk( //Create a fetchProductDetail async thunk
    'productInfo/fetchProductDetail', //Slice name
    async (product_id, thunkAPI) => { //Async function
        //Clear the productDetail property
        thunkAPI.dispatch(productInfoSlice.actions.resetProductInfo()); //Dispatch the resetProductInfo action
        //Try get the product detail from existing state
        const state = thunkAPI.getState(); //Get the state
        const product = state.productInfo.productList.data.find(
            (product) => product.product_id === product_id
        ); //Check if the product exist in the state
        if (product) {
            return product ; 
        }

        //Make call to the server
        try {
            const response = await getProductDetail(product_id); //Get the response from the server
            const productDetail = response.data.products[0]; //Get the product from the response
            return productDetail; //Return the response
        } catch (err) {
            console.log('There is Error in handling fetchProductDetail:', err);
        }

    }
);


// ----------------------------- Product Data Slice   ----------------------------- //

const productInfoSlice = createSlice({
    name: 'productInfo', //Slice name
    initialState: { //Initial state
        productList: {
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
        productDetail: {},
        fetchDataStatus: {
            isLoading: false,
            isError: false
        }
    },
    reducers: { //Reducers
        setProductInfo: (state, action) => { //setProductInfo reducer
            state.productDetail = action.payload; //Set the productInfo property to the payload
        },
        setCategroyFiltering: (state, action) => { //setCategroyFiltering reducer\
            state.productList.catergroy = action.payload; //Set the catergroy property to the payload
            //console.log(`Step 4: Slice Received the categoryID as : ${action.payload} and the state is :`, state.productList.catergroy);
        },
        setDisplayItems: (state, action) => { //setDisplayItems reducer 
            state.productList.displayItems = action.payload; //Set the displayItems property to the payload
        }, 
        resetProductInfo: (state) => { //resetProductInfo reducer
            state.productDetail = {}; //Set the productDetail property to an empty object
        }
    },
    extraReducers: (builder) => { //Extra reducers
        builder
            .addCase(fetchProductList.pending, (state) => { //Add case for pending fetchProductList
                state.fetchDataStatus.isLoading = true; //Set the isLoading property to true
                state.fetchDataStatus.isError = false; //Set the isError property to false
            })
            .addCase(fetchProductList.fulfilled, (state, action) => { //Add case for fulfilled fetchProductList
                state.fetchDataStatus.isLoading = false; //Set the isLoading property to false
                state.productList.data = action.payload; //Set the data property to the payload
                state.productList.totalItems = action.payload.length; //Set the totalItems property to the payload
            })
            .addCase(fetchProductList.rejected, (state, action) => { //Add case for rejected fetchProductList
                state.fetchDataStatus.isError = true; //Set the isError property to true
                console.log('There is an Error in Fetch Product List', action.error.message);
            })
            .addCase(fetchProductDetail.pending, (state) => { //Add case for pending fetchProductDetail
                state.fetchDataStatus.isLoading = true; //Set the isLoading property to true
                state.fetchDataStatus.isError = false; //Set the isError property to false
                
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => { //Add case for fulfilled fetchProductDetail
                state.fetchDataStatus.isLoading = false; //Set the isLoading property to false
                state.productDetail = action.payload; //Set the productDetail property to the payload
            })  
            .addCase(fetchProductDetail.rejected, (state, action) => { //Add case for rejected fetchProductDetail
                state.fetchDataStatus.isError = true; //Set the isError property to true
                console.log('There is an Error in Fetch Product Detail', action.error.message);
            });

    }
});

// ----------------------------- Export Actions ----------------------------- //
export { fetchProductList, fetchProductDetail }; //Export the fetchProductList async thunk
export const { setProductInfo, setCategroyFiltering, resetProductInfo } = productInfoSlice.actions; //Export the setProductInfo and setCategroyFiltering actions  

// ----------------------------- Export Selectors ----------------------------- //
export const selectProductList = (state) => state.productInfo.productList; //Export the selectProductList selector
export const selectProductFetchingStatus = (state) => state.productInfo.fetchDataStatus; //Export the selectProductListFetchingStatus selector  
export const selectProductDetail = (state) => state.productInfo.productDetail; //Export the selectProductDetail selector

// ----------------------------- Export Reducer ----------------------------- //
export default productInfoSlice.reducer; //Export the productInfoSlice reducer


