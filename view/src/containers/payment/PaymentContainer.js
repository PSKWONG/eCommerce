//----------------------- Import Modules --------------------------
import React from 'react';
import { Outlet } from 'react-router-dom';

//----------------------- Import Components --------------------------
import usePaymentData from './paymentData';

//------------------------Import Striple Promise --------------------------
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useStripleData from './stripleData';


//Get the Public Key from the environment
const environment = process.env.REACT_APP_ENV || 'development';
const striplePKey = environment === 'development' ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST : process.env.REACT_APP_STRIPE_PUBLIC_KEY;
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(striplePKey);


const CartWrapperContainer = () => {

    const paymentPageData = usePaymentData();

    //Striple Data
    const stripleData = useStripleData(paymentPageData);
    const clientSecret = stripleData.options.clientSecret;

console.log('This is the client secret:', clientSecret);

    return (
        <>
            {clientSecret && (
                <Elements key={clientSecret} options={stripleData.options} stripe={stripePromise}>
                    <Outlet />
                </Elements>
            )}
        </>
    )

};

export default CartWrapperContainer;