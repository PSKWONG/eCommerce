//------------------- Import Modules -------------------
//Core Modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//API Functions
import { loginAPI, logoutAPI, checkAuthAPI } from '../api/API';


//-------------------------------Thunks Function -------------------------------
// Function to authenticate user
const login = createAsyncThunk(
    'authentication/login',
    async ({ logindata, navigate }, thunkAPI) => {

        try {
            //Invoke the loginAPI function
            const response = await loginAPI(logindata);
            //If the response is successful, navigate to the home page
            console.log('API response:', response);
            if (response.status === 200) {
                navigate('/');
                return response.data; // user data
            } else if (response.status === 401) {
                const message = response.response.data || '';
                return message;
            }
        } catch (error) {
            console.log('Local Login API error:', error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const logout = createAsyncThunk(
    'authentication/logout',
    async (navigate, thunkAPI) => {
        try {
            const response = await logoutAPI();
            const status = response.status;
            if (status === 200) {
                navigate('/');
            }
            thunkAPI.dispatch(checkAuth());
        }catch(error){
            console.log('Logout API error:', error);
            return thunkAPI.rejectWithValue(error);
        }
       
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
            user: {},
            fetchData: {
                isLoading: false,
                isError: false,
                errorMessage: ''
            },

        },
        reducers: {
            setErrorMessages: (state, action) => {
                state.fetchData.errorMessage = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                    state.fetchData.isLoading = true;
                    state.fetchData.isError = false;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.fetchData.isLoading = false;
                    state.isAuthenticated = true;
                    
                    state.user = action.payload.user?.users[0];
                    console.log('This is the user data:', action.payload.user?.users[0]);
                    state.fetchData.errorMessage = action.payload.error?.message
                    console.log('This is the error message:', action.payload.error?.message);
                })
                .addCase(login.rejected, (state, action) => {
                    state.fetchData.isError = true;
                    state.fetchData.errorMessage = action.error.message;
                })
                .addCase(logout.pending, (state) => {
                    state.fetchData.isLoading = true;
                    state.fetchData.isError = false;
                })
                .addCase(logout.fulfilled, (state) => {
                    state.fetchData.isLoading = false;
                    state.fetchData.isError = false;
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
export { login, logout, checkAuth };
// Export Slice Actions
export const { clearErrorMessages, setErrorMessages } = AuthenticationSlice.actions;

//Export Selectors
export const selectIsAuthenticated = (state) => state.authentication.isAuthenticated;
export const selectUser = (state) => state.authentication.user;
export const selectFetchDataStatus = (state) => state.authentication.fetchData;

// Export Reducer
export default AuthenticationSlice.reducer;