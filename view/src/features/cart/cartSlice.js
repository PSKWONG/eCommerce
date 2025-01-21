// -------------------------- Import Modules --------------------------
import { createSlice } from '@reduxjs/toolkit';

// -------------------------- Import Components --------------------------



// -------------------------- Cart Slice --------------------------

const cartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState: {
            cartData: {
                items: [
                    
                ],
                total: 0
            }
        },
        reducers: {
            addProduct: (state,action)=>{
                state.cartData.items.push(action.payload);
            },
            updateProduct: (state,action)=>{
                const index = state.cartData.items.findIndex(item=>item.product_id === action.payload.product_id);
                state.cartData.items[index] = action.payload;
            },

        }
    }
);
//-------------------------- Export Actions --------------------------
export const { addProduct, updateProduct } = cartSlice.actions;
//-------------------------- Export Selector --------------------------
export const selectCartData = state => state.shoppingCart.cartData;
//-------------------------- Export Reducer --------------------------
export default cartSlice.reducer;

