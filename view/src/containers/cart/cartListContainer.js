// --------------------------- Imoport Modules ---------------------- 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// --------------------------- Import Components ----------------------
//Cart List Components 
import CartList from '../../components/cart/cartList/CartList';
import {useCartListData} from '../../containers/cart/cartData';
import { useCartListEffect } from './cartEffectHook';
import { fetchCartListAndSync, selectCartData } from '../../features/cart/cartSlice';


//Autherntication Slice
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';


const CartListContainer = () => {

    //-------------------------- Cart List External Data --------------------------
    //Get the authentication stsatus
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // External Data from Slices
    const cartListData = useSelector(selectCartData);


    //--------------------------Cart List Actions --------------------------
    //Get the authentication stsatus
    const dispatch = useDispatch(); 

    useEffect(()=>{
        if(isAuthenticated){
            //Fetch Cart List
            dispatch(fetchCartListAndSync());
        }
    }, [isAuthenticated]);   


    return (
        <CartList {...cartListData}/>
    )
}

export default CartListContainer;