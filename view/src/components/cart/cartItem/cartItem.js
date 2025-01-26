// ---------------------- Import Modules ----------------------
import React from 'react';


// ---------------------- Import Components ----------------------
import useCartItemTemplate from '../../../containers/cart/cartData';
import QuantityCount from '../QuantityCount'
import styles from './cartItem.module.css';



const CartItem = (props) => {

    //------------------------- Cart Item Data -------------------------
    const cartItemData = props.cartItemData || {};
    const counterData = props.counterData || {};
    const cartItemControllerData = props.cartItemControllerData || {};





    //------------------------- Conditional Rendering -------------------------
    //Check if the cart item is empty
    let isEmpty = Object.keys(cartItemData).length === 0;
    if (!isEmpty) {
        var { quantity } = cartItemData || 0;
    }

    let cartContent;

    switch (true) {
        //If the cart item is empty
        //OR the quantity is 0
        //Hide the cart item
        case isEmpty || quantity === 0:
            cartContent = <></>
            break;

        case !isEmpty && quantity > 0:
            //Extract Product Info
            const { product_name, unit_price } = cartItemData;

            //Phase 2 - Add the following code
            //Envrioment Variable
            const environment = process.env.REACT_APP_ENV;
            //Server URL
            const server_URL = environment === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;
            //Image Path
            const imageBaseURL = server_URL + '/assets/productImage/';


            //Extract Quantity Data Controller 
            const qantityDisplayStyle = cartItemControllerData.quantity.style;

            //Extract Counter Data Controller
            const counterDisplayStyle = cartItemControllerData.counter.style;

            //Extract Update Icon Data Controller
            const updateDisplayStyle = cartItemControllerData.updateIcon.style;
            const updateIcon = cartItemControllerData.updateIcon.icon;
            const updateHandler = cartItemControllerData.updateIcon.action;

            //Extract Delete Icon Data Controller
            const deleteDisplayStyle = cartItemControllerData.deleteIcon.style;
            const deleteIcon = cartItemControllerData.deleteIcon.icon;
            const deleteHandler = cartItemControllerData.deleteIcon.action;


            cartContent =

                <div className={styles.cartItemWrapper}>
                    <span className={styles.productInfo}>{product_name}</span>
                    <span>{unit_price}</span>
                    <QuantityCount counterData={counterData} className={`${counterDisplayStyle}`} />
                    <span className={`${qantityDisplayStyle}`}>{quantity}</span>
                    <img src={updateIcon} alt="update" onClick={updateHandler} className={`${updateDisplayStyle}`} />
                    <img src={deleteIcon} alt="delete" onClick={deleteHandler} className={`${deleteDisplayStyle}`} />
                </div>

            break;
    }


    return (
        <>
            {cartContent}
        </>
    )
};

export default CartItem;