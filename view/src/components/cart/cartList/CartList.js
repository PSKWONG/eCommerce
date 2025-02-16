//-------------------- Import Modules --------------------
import React from 'react';


//-------------------- Import Componenets --------------------
//Assets
import '../../../assets/styles/App.css';
import styles from './CartList.module.css';

import CartItem from '../../../containers/cart/cartItemContainer';
import Cost from './Cost';
import GuidingButton from './guideButton';
import Authentication from './Authentication';
import CartListing from './CartListing';
import CheckoutFormContainer from '../../../containers/payment/CheckOutFormContainer';
import Payment from './Payment';




const CartList = (props) => {

    //----------------------- Cart List Data -----------------------
    const cartList = props.cartListData.items || [];

    //------------------------ Cart List Controller Data -----------------
    const cartListControllerData = props.cartListControllerData || {};
    const { instruction } = cartListControllerData.progressGuideline


    return (
        <div className={`PageWrapper`}>
            <div className={` floatContentWrapper twoColumnWrapper ${styles.cartListAndACtionWrapper}`}>

                {/* Left Column - Cart List  */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.cartListWrapper}`}>
                    <h3>{instruction}</h3>
                    <CartListing cartListData={props.cartListData} cartListControllerData={cartListControllerData} />

                </div>

                {/* Right Column - Cart Actions  */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    <Cost cartCostData={props.cartCostData} />
                    <Authentication authentication={props.cartListControllerData.authentication} />
                    <Payment payment={props.cartListControllerData.payment} />
                    <div className={styles.guidingButtonsWrapper}>
                        <GuidingButton cartListControllerData={cartListControllerData} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartList;