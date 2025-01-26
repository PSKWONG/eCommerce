//-------------------- Import Modules --------------------
import React from 'react';


//-------------------- Import Componenets --------------------
//Assets
import '../../../assets/styles/App.css';
import styles from './CartList.module.css';

import CartItem from '../../../containers/cart/cartItemContainer';




const CartList = (props) => {

    //----------------------- Cart List Data -----------------------
    const cartList = props.items || [];


    //----------------------- Conditional rendering -----------------------
    const numberOfCartItems = cartList.length || 0;
    let cartListContent;

    switch (true) {
        case numberOfCartItems === 0:
            cartListContent = <div>There are no items in the cart</div>
            break;
        default:
            cartListContent =
                <>
                    <div>
                        {
                            cartList.map((cartItem, index) => {
                                return (
                                    <CartItem key={index} cartItem={cartItem} />
                                )
                            })
                        }
                    </div>
                </>

            break;
    }


    return (
        <div className={`PageWrapper`}> {/* A div element */}
            <div className={` floatContentWrapper twoColumnWrapper ${styles.cartListAndACtionWrapper}`}>

                {/* Left Column - Product Detail  */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.cartListWrapper}`}>
                    {cartListContent}
                </div>

                {/* Right Column - Cart Detail  */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>


                </div>

            </div>
        </div>
    )
}

export default CartList;