//-------------------- Import Modules ----------------------
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const [cartListProgress, setCartListProgress] = useState(0);
    const [instruction, setInstruction] = useState('');
    const [cartListStatus, setCartListStatus] = useState(false);
    const [backButtonStatus, setBackButtonStatus] = useState(false);
    const [nextButtonStatus, setNextButtonStatus] = useState(false);
    const [loginButtonStatus, setLoginButtonStatus] = useState(false);
    const [paymentButtonStatus, setPaymentButtonStatus] = useState(false);

    //----------------------- Actions -----------------------
    const navigate = useNavigate();


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
        if (cartListProgress < 3) {
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

    //Set the cart list progress based on the cart list data
    useEffect(() => {
        const validCartItem = cartListData.items.filter((item) => {
            return item.quantity > 0;
        })
        const isEmpty = validCartItem.length === 0 ? true : false;
        if (isEmpty) {
            setCartListProgress(0);
        }
        else{
            setCartListProgress(1);
        }
    }, [cartListData])




    //Update the Instruction based on the progress
    useEffect(() => {

        switch (cartListProgress) {
            case 0:
                setInstruction('There are no items in the cart');
                setCartListStatus(false);
                setBackButtonStatus(false);
                setNextButtonStatus(false);
                setPaymentButtonStatus(false);
                setLoginButtonStatus(false);
                break; 

            case 1:
                setInstruction('Step 1/3 : Check and adjust your shopping cart items.');
                setCartListStatus(true);
                setBackButtonStatus(false);
                setNextButtonStatus(true);
                setPaymentButtonStatus(false);
                setLoginButtonStatus(false);
                break;
            case 2:
                //Phase 2 - Address and delivery date confirmation
                setInstruction('Step 2/3 : Login and confirm the cart Item');
                setCartListStatus(true);
                setBackButtonStatus(true);
                break;
            case 3:
                setInstruction('Step 3/3 : Proceed the payment');
                setCartListStatus(false);
                setPaymentButtonStatus(true);



                break;
            default:
                break;
        }

    }, [cartListProgress])

    //Check the authentication status (Phase 1)
    useEffect(() => {
        if (cartListProgress === 2) {
            if (isAuthenticated) {
                setLoginButtonStatus(false);
                setNextButtonStatus(true);
                return;
            } else {
                setLoginButtonStatus(true);
                setNextButtonStatus(false);
                return;
            }
        }
        return;
        
    }, [cartListProgress, isAuthenticated])


    //Update the csot 
    useEffect(() => {
        dispatch(totalCost());
    }, [cartListData])


    //----------------------- Export Cart List Data -----------------------
    //Cart Item List Data 
    const cartListDataExport = useMemo(() => {
        return cartListData
    }, [cartListData])

    //Cart List Cost Data 
    const cartCost = useSelector(selectCartCost);

    //Cart List Controller Data 
    const cartListControllerData = {
        progressGuideline: {
            cartListProgress,
            instruction: instruction,
            
            backButton: {
                icon: backwardIcon,
                style: backButtonStatus ? styles.enable : styles.disable,
                handler: backButtonStatus ? handleBackButton : null
            },
            nextButton: {
                icon: forwardIcon,
                style: nextButtonStatus ? styles.enable : styles.disable,
                handler: nextButtonStatus ? handleNextButton : null
            }
        },
        cartListStatus:{
            style: cartListStatus ? styles.enable : styles.disable
        }, 
        authentication: {

            loginButton: {
                guideline: 'Login to proceed the payment & checkout',
                style: loginButtonStatus ? styles.enable : styles.disable,
                handler: handleLoginButton
            }

        },
        payement: {

        }
    }


    return { cartListDataExport, cartListControllerData, cartCost };


}

export default useProductListData;