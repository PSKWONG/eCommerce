// ------------------- Import Modules -------------------
//Core Modules
import React from 'react';
//Router Modules
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';


// ------------------- Import Components -------------------
//import App from '../components/App';
import Page from './PageContainer';


//-------------------- Router --------------------
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page />} />
  ) 
);
// ------------------- AppContainer -------------------
function AppContainer() {
  return(
    <RouterProvider router={appRouter} />
  )
}

export default AppContainer;
