// ------------------- Import Modules -------------------
//Core Modules
import React from 'react';
//Router Modules
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';


// ------------------- Import Components -------------------
//import App from '../components/App';
import Page from './page/PageContainer';
import Home from './HomeContainer';
import Login from './login/LoginContainer';
import Registration from './registration/RegContainer'
import ProductList from './product/productList/ProductListContainer';  //Import ProductListContainer
import ProductDetail from './product/productDetail/ProductDetail'


//-------------------- Router --------------------
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page />} > 
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path ="/product">
        <Route path="list">
          <Route index element={<ProductList/>} />
          <Route path=":category_id" element={<ProductList/>} />
        </Route>
        <Route path="detail">
          <Route index element={<ProductDetail/>} />
          <Route path=":product_id" element={<ProductDetail/>} />
        </Route>
        
      </Route>
    </Route>
  ), 
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);
// ------------------- AppContainer -------------------
function AppContainer() {
  return(
    <RouterProvider router={appRouter} />
  )
}

export default AppContainer;
