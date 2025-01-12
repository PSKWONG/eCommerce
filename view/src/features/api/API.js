// ----------  Import Modules ---------- //
//Axios
import axios from 'axios';

//-------------------- Variables --------------------//
//envrioment
const environment = process.env.NODE_ENV;
//API URL
const API_URL = environment === 'production' ? process.env.REACT_API_URL_PROD : process.env.REACT_APP_API_URL;


//-------------------- API Functions --------------------//
// Basic API call 
const api = axios.create(
    {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

// Function to make GET requests
const getAPI = async (path) => {
    try {
        const response = await api.get(path);
        return response.data;
    } catch (error) {
        return error;
    }
};

// Function to make POST requests
const postAPI = async (path, body) => {
    try {
        const response = await api.post(path, body);
        return response.data;
    } catch (error) {
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
    return postAPI(`/auth/login`, body);
};

//Check Authentication Status
export const checkAuthAPI = async () => {
    return getAPI(`/auth/check`);
};

//Logout
export const logoutAPI = async () => {
    return getAPI(`/auth/logout`);
};

//---------------------User API---------------------//
//Get User
export const getUser = async (id) => {
    return getAPI(`/users/profile`);
};