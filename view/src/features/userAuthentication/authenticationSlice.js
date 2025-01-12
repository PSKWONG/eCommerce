//------------------- Import Modules -------------------
//Core Modules
import { createSlice } from "@reduxjs/toolkit";

// ------------------------------ Authentication Slice ------------------------------

const AuthenticationSlice = createSlice(
    {
        name: 'authentication',
        initialState: {
            isAuthenticated: false,
            user: null
        },
    }
);