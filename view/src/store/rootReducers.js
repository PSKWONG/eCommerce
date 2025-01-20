//--------------Import Modules--------------
//Core Modules
import { combineReducers } from "@reduxjs/toolkit";

//--------------------Import Reducers--------------------
import authenticationReducer from '../features/authentication/authenticationSlice'; 
import productInfoReducer from '../features/productInfo/productInfoSlice';
import shoppingCartReducer from '../features/cart/cartSlice';


// ------------------------------ Root Reducer ------------------------------
const rootReducer = combineReducers({
    authentication: authenticationReducer,
    productInfo: productInfoReducer,
    shoppingCart: shoppingCartReducer
});

export default rootReducer;
