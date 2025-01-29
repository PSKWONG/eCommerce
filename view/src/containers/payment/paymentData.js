import { useSelector } from "react-redux"
import { selectCartData } from "../../features/cart/cartSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/authentication/authenticationSlice";

const usePaymentData = ()=>{
    //Check if the URL contains the payment_intent_client_secret
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
    

    const cartList = useSelector(selectCartData).items; 
    const isAuthen = useSelector(selectIsAuthenticated); 

    //---------------------- Actions ----------------------
    const navigate = useNavigate();

    useEffect(()=>{
        const isEmpty = cartList.length === 0;
        if(clientSecret){
            return;
        }

        if(isEmpty || !isAuthen){
            //Redirect to cart page
            navigate('/cart');
        }

    },[cartList, isAuthen, clientSecret])

    return{
        paymentPageData: {
            clientSecret
        }
    }

}; 

export default usePaymentData;