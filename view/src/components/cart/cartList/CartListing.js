//----------------- Import Modules -------------------
import React from 'react';
import CartItem from '../../../containers/cart/cartItemContainer';


const CartListing = (props) => {

    //----------------------- Cart List Data -----------------------
    const cartList = props.cartListData.items || [];
    const controllerData = props.cartListControllerData || {};

    //----------------------- Conditional rendering -----------------------
    const numberOfCartItems = cartList.length || 0;
    let cartListContent;

    switch (true) {
        case numberOfCartItems === 0:
            cartListContent = <></>
            break;

        default:

            cartListContent =
                <div className={controllerData.cartListStatus.style}>
                    {
                        cartList.map((cartItem, index) => {
                            return (
                                <CartItem key={index} cartItemData={cartItem} cartItemControllerData={controllerData} />
                            )
                        })
                    }
                </div>
            break;
    }



    return (
        <div>
            {cartListContent}
        </div>
    )

};

export default CartListing;
