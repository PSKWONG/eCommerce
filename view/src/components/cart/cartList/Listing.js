//---------------- Import Modules -------------------
import React from 'react';


//---------------- Import Componenets -------------------
import CartItemContainer from '../../../containers/cart/cartItemContainer';



//---------------- Listing Component -------------------

const Listing = (props)=>{

    //Set the default value of cartList
    const cartList = props.cartList || [];

    //Set the CartListing Content
    const isCartListEmpty = cartList.length == 0 ? true : false;
    let content;

    switch (true) {
        case isCartListEmpty:
            content = <div>There are no items in the cart</div>
            break;
        default:
            content =  <CartItemContainer />

            break;
    }



    return(
        <>
            {content}
        </>
    )
}

export default Listing;