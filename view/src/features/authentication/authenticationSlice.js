//------------------- Import Modules -------------------
//Core Modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//API Functions
import { loginAPI, logoutAPI, checkAuthAPI } from '../api/API';

//-------------------------------Thunks Function -------------------------------
// Function to authenticate user
const login = createAsyncThunk(
    'authentication/login',
    async (credentials, thunkAPI) => {
        const response = await loginAPI(credentials);
        return response;
    }
); 

const logout = createAsyncThunk(
    'authentication/logout',
    async () => {
        const response = await logoutAPI();
        return response;
    }
);

const checkAuth = createAsyncThunk(
    'authentication/checkAuth',
    async () => {
        const response = await checkAuthAPI();
        return response.data;
    }
);


// ------------------------------ Authentication Slice ------------------------------

const AuthenticationSlice = createSlice(
    {
        name: 'authentication',
        initialState: {
            isAuthenticated: false,
            user: null, 
            fetchData:{
                isLoading: false,
                isError: false,
                errorMessage: ''
            },

        },
        reducers:{},
        extraReducers: (builder) =>{
            builder
                .addCase(login.pending, (state) => {
                    state.fetchData.isLoading = true;
                    state.isError = false;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.fetchData.isLoading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload.users[0];
                })
                .addCase(login.rejected, (state, action) => {
                    state.error.hasError = true;
                    state.error.message = action.error.message;
                })
                .addCase(logout.pending, (state) => {
                    state.fetchData.isLoading = true;
                    state.isError = false;
                })
                .addCase(logout.fulfilled, (state) => {
                    state.fetchData.isLoading = false;
                    state.fetchData.isError = false;
                    state.isAuthenticated = false;
                    state.user = null;
                })
                .addCase(logout.rejected, (state, action) => {
                    state.fetchData.isLoading = false;
                    state.fetchData.isError = true;
                    state.fetchData.errorMessage = action.error.message;
                })
                .addCase(checkAuth.pending, (state) => {
                    state.fetchData.isLoading = true;
                    state.fetchData.isError = false;
                })
                .addCase(checkAuth.fulfilled, (state, action) => {
                    state.fetchData.isLoading = false;
                    state.isAuthenticated = action.payload;
                })
                .addCase(checkAuth.rejected, (state, action) => {
                    state.fetchData.isLoading = false;
                    state.fetchData.isError = true;
                    state.fetchData.errorMessage = action.error.message;
                });
        }
           
    }
);

// Export Thunk Actions 
export { login , logout, checkAuth } ; 

//Export Selectors
export const selectIsAuthenticated = (state) => state.authentication.isAuthenticated;
export const selectUser = (state) => state.authentication.user;
export const selectFetchDataStatus = (state) => state.authentication.fetchData;

// Export Reducer
export default AuthenticationSlice.reducer;