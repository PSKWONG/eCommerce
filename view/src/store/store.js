// ----- ----- ---------------------------- Import Modules ---------------------------- ----- -----
//Core Modules
import {configureStore} from '@reduxjs/toolkit';


// ------------------------ Import Reducers ------------------------
import rootReducer from './rootReducers';


// ------------------------ Import Middleware ------------------------



// ------------------------ Import Actions ------------------------



// ------------------------ Import Selectors ------------------------




// ------------------------ Create Store ------------------------
const store = configureStore({
  reducer: rootReducer,
});
export default store;