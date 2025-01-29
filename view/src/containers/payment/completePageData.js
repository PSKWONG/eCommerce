//---------------------- Import Modules ----------------------
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  useStripe,
} from "@stripe/react-stripe-js";
import { fetchCartListAndSync, selectCartData } from "../../features/cart/cartSlice";
import { checkOutCartAPI } from "../../features/api/API";


const useCompletePageData = () => {

  //----------------------- States for Checkout Page ----------------------
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);
  const cartList = useSelector(selectCartData); 

  //-------------------------- Helper Functions --------------------------
  const stripe = useStripe();
  const dispatch = useDispatch(); 

  const fetchAndSyncCart = async () => {
    await dispatch(fetchCartListAndSync()); 
  }; 


  //-------------------------- Actions for Checkout Page --------------------------
 


  useEffect(() => {

    //Check if stripe is not null
    if (!stripe) {
      return;
    }

    //Extract the payment_intent_client_secret from the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  // Invoke the checkout process on successful payment
  useEffect(() => {
    if (status === "succeeded") {
      fetchAndSyncCart(); 
    }
  }, [status]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("This is the cartList", cartList);
      //Handle the success case
      const postBody = {
        paymentIntentId: intentId,
        cartRecord: cartList.items
      }
      const postForCheckout = async () => {
        const response = await checkOutCartAPI(postBody);
        console.log(response);
        return response;
      }; 

      postForCheckout()
    

    }
  }, [cartList]);


  //--------------------------Data to Export -------------------- 

  const STATUS_CONTENT_MAP = {
    succeeded: {
      text: "Payment succeeded",
      iconColor: "#30B130",
      icon: null,
    },
    processing: {
      text: "Your payment is processing.",
      iconColor: "#6D6E78",
      icon: null,
    },
    requires_payment_method: {
      text: "Your payment was not successful, please try again.",
      iconColor: "#DF1B41",
      icon: null,
    },
    default: {
      text: "Something went wrong, please try again.",
      iconColor: "#DF1B41",
      icon: null,
    }
  };



};

export default useCompletePageData;