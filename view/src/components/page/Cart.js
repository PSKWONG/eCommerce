//---------------------------- Import Modules --------------------------
import React from "react";

//----------------------- Import components -----------------------
//Assets
import checkoutIcon from '../../assets/images/checkOut.png';
import cartIcon from '../../assets/images/cart.png';


// ------------------------------ Cart Component ------------------------------
const Cart = (props) => {
    const cartItems = 0 ; // Default condition
    const { actions } = props;

    let content; 
    if (cartItems) {
        content = <img src={checkoutIcon} alt="Checkout" />;
    } else {
        content = <img src={cartIcon} alt="Cart" onClick={actions} />;
    } 

    return (
        <>
            {content}
        </>
    );
};

export default Cart;