//-------------------- Import Modules ----------------------
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

//--------------------- Import Components ----------------------
import { fetchCartListAndSync, selectCartData, totalCost, selectCartCost } from '../../features/cart/cartSlice';
//Autherntication Slice
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';
//Styles
import styles from '../../components/cart/cartList/CartList.module.css';
//Image
import backwardIcon from '../../assets/images/backwardButton.png';
import forwardIcon from '../../assets/images/forwardButton.png';



const useProductListData = () => {

    //----------------------- Cart List States -----------------------
    const [cartListProgress, setCartListProgress] = useState(1);
    const [instruction, setInstruction] = useState('');
    const [backButtonStatus, setBackButtonStatus] = useState(false);
    const [nextButtonStatus, setNextButtonStatus] = useState(false);
    const [loginButtonStatus, setLoginButtonStatus] = useState(false);
    const [paymentButtonStatus, setPaymentButtonStatus] = useState(false);

    //----------------------- Actions -----------------------
    const navigate=  useNavigate(); 


    //-------------------------- Cart List External Data --------------------------
    //Get the authentication stsatus
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // External Data from Slices
    const cartListData = useSelector(selectCartData);

    //---------------------------- Cart List Handlers ----------------------------

    const handleBackButton = (e) => {
        e.preventDefault();
        if (cartListProgress > 1) {
            setCartListProgress(cartListProgress - 1);
            return
        }
    }

    const handleNextButton = (e) => {
        e.preventDefault();
        if (cartListProgress < 2) {
            setCartListProgress(cartListProgress + 1);
            return
        }
    }

    const handleLoginButton = (e) => {
        e.preventDefault();
        navigate('/login');
    }


    //--------------------------Cart List Actions --------------------------
    //Get the authentication stsatus
    const dispatch = useDispatch();

    //Fetch Cart List and Sync when the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            //Fetch Cart List
            dispatch(fetchCartListAndSync());
        }
    }, [isAuthenticated]);

   


    //Update the Instruction based on the progress
    useEffect(() => {

        switch (cartListProgress) {
            case 1:
                setInstruction('Step 1/3 : Check and adjust your shopping cart items.');
                setBackButtonStatus(false);
                setNextButtonStatus(true);
                setPaymentButtonStatus(false);
                setLoginButtonStatus(false);
                break;
            case 2:
                setInstruction('Step 2/3 : Login and progress the payment');
                setBackButtonStatus(true);
                setNextButtonStatus(false);
                setPaymentButtonStatus(true);
                setLoginButtonStatus(true);
                break;
            case 3:
                setInstruction('Step 3/3 : Confirm the order');
                
                break;
            default:
                break;
        }

    }, [cartListProgress])

     //Update the Login Button & Payment button Status based on the authentication status
     useEffect(() => {
        if(cartListProgress===1){
            return; 
        }
        if (isAuthenticated) {
            setLoginButtonStatus(false);
            setPaymentButtonStatus(true);
        } else {
            setLoginButtonStatus(true);
            setPaymentButtonStatus(false);
        }
    }, [cartListProgress, isAuthenticated])


    //Update the csot 
    useEffect(()=>{
        dispatch(totalCost()); 
    },[cartListData])


    //----------------------- Export Cart List Data -----------------------
    const cartListDataExport = useMemo(()=>{
        return cartListData
    }, [cartListData])

    const cartCost = useSelector(selectCartCost); 

    console.log('this is the cost data',cartCost);

    const cartListControllerData = {
        progressGuideline:{
            instruction: instruction,
            cartListProgress,
            backButton:{
                icon: backwardIcon,
                style: backButtonStatus? styles.enable : styles.disable,
                handler:backButtonStatus? handleBackButton : null
            },
            nextButton:{
                icon:forwardIcon,
                style: nextButtonStatus? styles.enable : styles.disable,
                handler:nextButtonStatus? handleNextButton : null
            }
        },
        authentication:{
            
            loginButton:{
                guideline: 'Login to proceed the payment & checkout',
                style: loginButtonStatus? styles.enable : styles.disable,
                handler: handleLoginButton
            }

        },
        payement:{

        }
    }


    return {cartListDataExport, cartListControllerData, cartCost}; 


}

export  default useProductListData;