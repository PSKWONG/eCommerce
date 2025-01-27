// -------------------------- Import Modules --------------------------
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCartList, addServerCartItemAPI, updateServerCartItemAPI } from '../api/API';

// -------------------------- Import Components --------------------------

// -------------------------- Variables --------------------------

const fetchCartListAndSync = createAsyncThunk(
    'shoppingCart/fetchCartListAndSync',
    async (data, thunkAPI) => {

        console.log('Start the fetch & Sync ');

        // Get the local store items
        const localCart = thunkAPI.getState().shoppingCart.cartData.items;
        const isLocalEmpty = localCart.length > 0 ? false : true; 

        // Get the server cart items
        try{
            const response = await getCartList(); // Get the server store 
            const serverCart = response.data.cartList; // Get the server store items
            const isServerEmpty = serverCart.length > 0 ? false : true; // Check if the server store is empty

            // Conditon 1 -  If both local and server store are empty, return
            if(isLocalEmpty && isServerEmpty){
                return [];
            }

            // Start the Synchronisation process
            // Condition 2 -  If the local store is empty while the server have items. 
            // Update the local store with the server store
            if(isLocalEmpty){
                return serverCart;
            }

            //Condtion 3 - Both local and server store have items
            //Start Checking the items solely in the local store
            const pendingUploadItems = localCart.filter((localItem)=>{
                return !serverCart.find((serverItem)=>{
                    return serverItem.product_id == localItem.product_id;
                })
            })

            //Start uploading the items to the server store
            for (const Item of pendingUploadItems){
                try {
                    await addServerCartItemAPI(Item); 
                }catch(err){
                    console.log ("There is an error on uploading the cart Items", Item,  err)
                    return localCart; 
                }
            }

            //Get the Item will same Product ID but Local Quantity is larger than the server quantity 
            const itemsToUpdate = localCart.filter((LocalItem)=>{
                return serverCart.find((serverItem)=>{
                    return serverItem.product_id == LocalItem.product_id && serverItem.quantity < LocalItem.quantity;
                })
            }); 

            //Start updating the items to the server store
            for (const item of itemsToUpdate){
                try {
                    await updateServerCartItemAPI(item);
                }catch(err){
                    console.log('There is an error on updating the cart Items', item, err);
                    return localCart;
                }
            }

            //Get the Item will same Product ID and Local Quantity  = 0 
            const itemsToDelete = localCart.filter((LocalItem)=>{
                return serverCart.find((serverItem)=>{
                    return serverItem.product_id == LocalItem.product_id && LocalItem.quantity == 0 ;
                })
            }); 

            //Start deleting the items to the server store
            for (const item of itemsToDelete){
                try {
                    await updateServerCartItemAPI(item);
                }catch(err){
                    console.log('There is an error on deleting the cart Items', item, err);
                    return localCart; 
                }
            }

            //Get the latest server cart Items 
            try {
                const latestServerCart = await getCartList();
                return latestServerCart.data.cartList;
            }catch(err){
                console.log('There is an error on getting the latest server cart Items', err);
                return localCart;
            }
            

        }catch(err){
            console.log('There is Error in handling fetchCartListAndSync:', err);
        }
        
    }
); 

const updateServerCartItem = createAsyncThunk(
    'shoppingCart/updateServerCartItem',
    async (data, thunkAPI) => {

        console.log('Data to update:', data);

        try {
            const response = await updateServerCartItemAPI(data);
            console.log('Updated Cart Item from server :', response);
            return response.cartList[0];
        }catch(err){
            console.log('There is an error on updating the cart Items', err);
        }
    }
); 

const addServerCartItem = createAsyncThunk(
    'shoppingCart/addServerCartItem',
    async (data, thunkAPI) => {
        try {
            const response = await addServerCartItemAPI(data);
            console.log('Added Cart Item from server :', response);
            return response.data.cartList[0];
        }catch(err){
            console.log('There is an error on adding the cart Items', err);
        }
    }
);



// -------------------------- Cart Slice --------------------------

const cartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState: {
            cartData: {
                items: [
                    /* Structure of the items should be as following: 
                    {
                        product_id: 1,
                        description: 'Product 1 Description',
                        product_name: 'Product 1',
                        unit_price: "$9.99",
                        quantity: 1
                    }
                    */
                ]
            },
            cost:{
                cartTotal:0
            },
            fetchDataStatus:{
                isLoading: false,
                isError: false,
                error: null
            }
        },
        reducers: {
            updateCart: (state,action)=>{
                state.cartData.items = action.payload;
            },
            addItemToCart: (state,action)=>{
                state.cartData.items.push(action.payload);
                console.log('Added Cart Item:', action.payload);
            },
            updateCartItem: (state,action)=>{
                const index = state.cartData.items.findIndex(item=>item.product_id === action.payload.product_id);
                state.cartData.items[index] = action.payload;
            },
            totalCost: (state)=>{
                state.cost.cartTotal = state.cartData.items.reduce((acc, cur)=>{
                    const price = parseFloat(cur.unit_price.replace('$','').toFixed(2)) || 0;
                    const quantity = Number(cur.quantity) || 0;
                    return acc + (price * quantity);
                } ,0);
            }

        }, 
        extraReducers: (builder)=>{
            builder
                .addCase(fetchCartListAndSync.pending, (state)=>{
                    state.fetchDataStatus.isLoading = true;
                    state.fetchDataStatus.isError = false;
                })
                .addCase(fetchCartListAndSync.fulfilled, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = false;
                    state.cartData.items = action.payload;
                })
                .addCase(fetchCartListAndSync.rejected, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = true;
                    state.fetchDataStatus.error = action.error.message;
                })
                .addCase(updateServerCartItem.pending, (state)=>{
                    state.fetchDataStatus.isLoading = true;
                    state.fetchDataStatus.isError = false;
                })
                .addCase(updateServerCartItem.fulfilled, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = false;
                    const index = state.cartData.items.findIndex(item=>item.product_id === action.payload.product_id);
                    state.cartData.items[index] = action.payload;
                    console.log('Updated Cart Item from server :', index, action.payload);
                })
                .addCase(updateServerCartItem.rejected, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = true;
                    state.fetchDataStatus.error = action.error.message;
                })
                .addCase(addServerCartItem.pending, (state)=>{
                    state.fetchDataStatus.isLoading = true;
                    state.fetchDataStatus.isError = false;
                })
                .addCase(addServerCartItem.fulfilled, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = false;
                    state.cartData.items.push(action.payload);
                })
                .addCase(addServerCartItem.rejected, (state, action)=>{
                    state.fetchDataStatus.isLoading = false;
                    state.fetchDataStatus.isError = true;
                    state.fetchDataStatus.error = action.error.message;
                })

        }
            
                    
    }
);
//-------------------------- Export Actions --------------------------
export const { addItemToCart, updateCartItem, updateCart, totalCost } = cartSlice.actions;
export { fetchCartListAndSync, updateServerCartItem, addServerCartItem };
//-------------------------- Export Selector --------------------------
export const selectCartData = state => state.shoppingCart.cartData;
export const selectCartCost = state => state.shoppingCart.cost;
//-------------------------- Export Reducer --------------------------
export default cartSlice.reducer;

