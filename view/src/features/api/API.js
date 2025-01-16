// ----------  Import Modules ---------- //
//Axios
import axios from 'axios';

//-------------------- Variables --------------------//
//envrioment
const environment = process.env.REACT_APP_ENV;
//API URL
const API_URL = environment === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;

//-------------------- API Functions --------------------//
// Basic API call 
const api = axios.create(
    {
        baseURL: '/api/',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    }
);

// Function to make GET requests
const getAPI = async (path) => {
    try {
        const response = await api.get(path);
        return response;
    } catch (error) {
        return error;
    }
};

// Function to make POST requests
const postAPI = async (path, body) => {
    try {
        const response = await api.post(path, body);
        return response;
    } catch (error) {
        console.error('API error:', error);
        return error;
    }
};

// Function to make PUT requests
const putAPI = async (path, body) => {
    try {
        const response = await api.put(path, body);
        return response.data;
    } catch (error) {
        return error;
    }
};

// Function to make DELETE requests
const deleteAPI = async (path) => {
    try {
        const response = await api.delete(path);
        return response.data;
    } catch (error) {
        return error;
    }
};

//---------------------Authentication API ---------------------//
//Login
export const loginAPI = async (body) => {
    return postAPI(`/authen/login`, body);
};

//Check Authentication Status
export const checkAuthAPI = async () => {
    return getAPI(`/authen/check`);
};

//Logout
export const logoutAPI = async () => {
    return getAPI(`/authen/logout`);
};

//---------------------User API---------------------//
//Get User
export const getUser = async (id) => {
    return getAPI(`/users/profile`);
};


//---------------------Registration API---------------------//
//Check User Input 
export const checkUserInput = async (body) => {
    return postAPI(`/user/registration/check`, body);
};

//Submite for Registration
export const submitRegistration = async (body) => {
    return postAPI(`/user/registration`, body);
};