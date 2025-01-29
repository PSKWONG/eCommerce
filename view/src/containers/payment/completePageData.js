//---------------------- Import Modules ----------------------
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  useStripe,
} from "@stripe/react-stripe-js";
import { fetchCartListAndSync, selectCartData, updateCart } from "../../features/cart/cartSlice";
import { checkOutCartAPI } from "../../features/api/API";
import {useNavigate} from 'react-router-dom';


const useCompletePageData = () => {

  //----------------------- States for Checkout Page ----------------------
  const [status, setStatus] = useState("default");
  const [intentId, setIntentId] = useState(null);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isPending , setIsPending] = useState(true);
  const cartList = useSelector(selectCartData);

  //-------------------------- Helper Functions --------------------------
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  //Get the data from the database and Sync with the local States 
  const fetchAndSyncCart = async () => {
    await dispatch(fetchCartListAndSync());
  };

  //Invoke a API call to checkout the cart
  const postForCheckout = async (body) => {
    await checkOutCartAPI(body);
    return;
  };


  //-------------------------- Actions for Checkout Page --------------------------


  // Invoke the checking with stripe server to get the payment intent
  useEffect(() => {

    //Check if stripe is not null
    if (!stripe) {
      setIsPending(false);
      
      return;
    }

    //Extract the payment_intent_client_secret from the URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setIsPending(false);
      return;
    }

    //Retrieve the payment intent from the client secret
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }
    
      //Set the status and intentId if the paymentIntent is successfull
      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);


  // Invoke on retrieving the cart data from the database
  useEffect(() => {
    if (status === "succeeded") {
      fetchAndSyncCart();
    }else{
      setIsPending(false);
    }
  }, [status]);


  //Invoke the checkout API call when the cart is fetched and the payment is successful
  useEffect(() => {

    if (status === "succeeded" && !isCheckedOut) {

      //Construct a body for the post request
      const postBody = {
        paymentIntentId: intentId,
        cartRecord: cartList.items
      }
     
      //Post a request to checkout the cart
      postForCheckout(postBody)

      // Indicate that the CheckOut is done  
      setIsCheckedOut(true);

    }
  }, [cartList]);

  //Clean up the cart after the checkout is done
  useEffect(()=>{
    if(isCheckedOut && !isCleaningUp){

      const updateCartList = cartList.items.map((item) => {
        return{
          ...item,
          quantity: 0
        }
        
      });
      console.log('This is the cart list', updateCartList);

      //Dispatch the updated cart list
      dispatch(updateCart(updateCartList));

      //Clean up the cart in database
      fetchAndSyncCart();

      //Clean up the cart
      setIsCleaningUp(true);

      //Set the pending status to false
      setIsPending(false);
    }
  },[isCheckedOut])

  //Navigate to the home page after the cart is cleaned up
  useEffect(()=>{
    if(!isPending){

      const redirect = setTimeout(()=>{
        navigate('/');
      }, 5000);

      return () => clearTimeout(redirect);
    }
  },[isPending])





  //--------------------------Data to Export -------------------- 

  const STATUS_CONTENT_MAP = {
    succeeded: {
      text: "Payment succeeded. You will be redirect to the home page in 5 seconds.",
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
    attention: {
      text: "Something went wrong, please try again.",
      iconColor: "#DF1B41",
      icon: null,
    }, 
    default: {
      text: "Thanks for your patient, we are processing your payment. Please do not refresh the page.",
      iconColor: "#DF1B41",
      icon: null,
    }
  };

  const completePageData = STATUS_CONTENT_MAP[status];

  return completePageData

};

export default useCompletePageData;