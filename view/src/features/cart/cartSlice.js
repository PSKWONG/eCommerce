// -------------------------- Import Modules --------------------------
import { createSlice } from '@reduxjs/toolkit';

// -------------------------- Import Components --------------------------



// -------------------------- Cart Slice --------------------------

const cartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState: {         
            cartData: {
                items: [],
                total: 0
            }
        },
        reducers: {

        }
    }
);
//-------------------------- Export Selector --------------------------
export const selectCartData = state => state.shoppingCart.cartData;
//-------------------------- Export Reducer --------------------------
export default cartSlice.reducer;

