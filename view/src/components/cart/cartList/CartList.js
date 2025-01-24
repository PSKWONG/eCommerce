//-------------------- Import Modules --------------------
import React from 'react';


//-------------------- Import Componenets --------------------
//Assets
import '../../../assets/styles/App.css';
import styles from './CartList.module.css';

import Listing from './Listing';




//-------------------- CartList --------------------
const CartList = (props) => {

    //Extracting data from props
    const cartList = props.items || [];


    //Set the CartListing Data 
    const numberOfCartItems = cartList.length || 0;
    let content; 

    switch (true) {
        case numberOfCartItems === 0:
            content = <div>There are no items in the cart</div>
            break;
        default:
            content =  <Listing cartList = {cartList}  />

            break;
    }


    return (
        <div className={`PageWrapper`}> {/* A div element */}
            <div className={` floatContentWrapper twoColumnWrapper ${styles.cartListAndACtionWrapper}`}>

                {/* Left Column - Product Detail  */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.cartListWrapper}`}>
                      {content}
                </div>

                {/* Right Column - Cart Detail  */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    
                    
                </div>

            </div>
        </div>
    )
}

export default CartList;