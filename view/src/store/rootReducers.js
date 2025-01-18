//--------------Import Modules--------------
//Core Modules
import { combineReducers } from "@reduxjs/toolkit";

//--------------------Import Reducers--------------------
import authenticationReducer from '../features/authentication/authenticationSlice'; 
import productInfoReducer from '../features/productInfo/productInfoSlice';


// ------------------------------ Root Reducer ------------------------------
const rootReducer = combineReducers({
    authentication: authenticationReducer,
    productInfo: productInfoReducer
});

export default rootReducer;
