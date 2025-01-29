// ------------------- Import Modules -------------------
//Core Modules
import React from 'react';
//Router Modules
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';


// ------------------- Import Components -------------------
//import App from '../components/App';
import Page from './page/PageContainer';
//Index Page
import Home from './HomeContainer';
//Authentication 
import Login from './login/LoginContainer';
import Registration from './registration/RegContainer'
//Product
import ProductList from './product/ProductListContainer';  //Import ProductListContainer
import ProductDetail from './product/ProductDetailContainer'
//Cart
import CartList from './cart/cartListContainer' //Import CartListContainer
import Payment from './payment/PaymentContainer'
import CheckOut from '../components/payment/CheckOut'
import Complete from './payment/CompleteContainer'
//User
import UserWrapper from './user/UserContainer'
import Profile from './user/ProfileContainer'



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
      <Route path="/cart" >
        <Route index element={<CartList />} />
      </Route>
      <Route path="/payment" element={<Payment />} >
        <Route index element={<CheckOut />} />
        <Route path='complete' element={<Complete />} />
      </Route>
      <Route path ="/user" element={<UserWrapper/>}>
        <Route index element={<Profile/>} />
        <Route path="profile" element={<Profile/>} />
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
