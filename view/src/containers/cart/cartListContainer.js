// --------------------------- Imoport Modules ---------------------- 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// --------------------------- Import Components ----------------------
//Cart List Components 
import CartList from '../../components/cart/cartList/CartList';
import { fetchCartListAndSync, selectCartData } from '../../features/cart/cartSlice';


//Autherntication Slice
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';
import useProductListData from './cartListData';


const CartListContainer = () => {

    const cartListPageData = useProductListData();
    const cartListData = cartListPageData.cartListDataExport; 
    const cartListControllerData = cartListPageData.cartListControllerData;
    const cartCostData = cartListPageData.cartCost;

    return (
        <CartList 
            cartListData={cartListData}
            cartListControllerData={cartListControllerData}
            cartCostData = {cartCostData}

        />
    )
}

export default CartListContainer;