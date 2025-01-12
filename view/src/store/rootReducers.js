//--------------Import Modules--------------
//Core Modules
import { combineReducers } from "@reduxjs/toolkit";

//--------------------Import Reducers--------------------
import authenticationReducer from '../features/authentication/authenticationSlice'; 


// ------------------------------ Root Reducer ------------------------------
const rootReducer = combineReducers({
    authentication: authenticationReducer,
});

export default rootReducer;
