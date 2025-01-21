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
                    { product_id: 1, quantity: 10, unit_price: 100 },
                    { product_id: 2, quantity: 12, unit_price: 20 },
                ],
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

