// --------------------------- Imoport Modules ---------------------- 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// --------------------------- Import Components ----------------------
//Cart List Components 
import CartList from '../../components/cart/cartList/CartList';


//Autherntication Slice
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';
import useProductListData from './cartListData';

//------------------------Import Striple Promise --------------------------
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useStripleData from '../../containers/payment/stripleData';
//Get the Public Key from the environment
const environment = process.env.REACT_APP_ENV || 'development';
const striplePKey = environment === 'development' ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST : process.env.REACT_APP_STRIPE_PUBLIC_KEY;
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(striplePKey);



const CartListContainer = () => {

    //Cart List Page Data 
    const cartListPageData = useProductListData();
    const cartListData = cartListPageData.cartListDataExport;
    const cartListControllerData = cartListPageData.cartListControllerData;
    const cartCostData = cartListPageData.cartCost;

    //Striple Data
    const stripleData = useStripleData();
    const { clientSecret } = stripleData.options;
    

    return (
        <>
            {clientSecret && (
                <Elements key = {clientSecret} options={stripleData.options} stripe={stripePromise}>
                    <CartList
                        cartListData={cartListData}
                        cartListControllerData={cartListControllerData}
                        cartCostData={cartCostData}
                    />
                </Elements>
            )}
        </>

    )
}

export default CartListContainer;