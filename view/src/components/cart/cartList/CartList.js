//-------------------- Import Modules --------------------
import React from 'react';


//-------------------- Import Componenets --------------------
//Assets
import '../../../assets/styles/App.css';
import styles from './CartList.module.css';

import CartItem from '../../../containers/cart/cartItemContainer';
import Cost from './Cost';
import GuidingButton from './guideButton';
import Authentication from './guideline';




const CartList = (props) => {

    //----------------------- Cart List Data -----------------------
    const cartList = props.cartListData.items || [];


    //----------------------- Conditional rendering -----------------------
    const numberOfCartItems = cartList.length || 0;
    let cartListContent;
    let guideButtonContent;

    switch (true) {
        case numberOfCartItems === 0:
            cartListContent = <div>There are no items in the cart</div>
            guideButtonContent = <></>
            break;
        default:
            const { progressGuideline } = props.cartListControllerData;
            const { instruction } = progressGuideline;


            cartListContent =
                <>
                    <div>
                        <h3>{instruction}</h3>
                        {
                            cartList.map((cartItem, index) => {
                                return (
                                    <CartItem key={index} cartItem={cartItem} progressGuideline={progressGuideline} />
                                )
                            })
                        }
                    </div>
                </>

            guideButtonContent =
                <div className={styles.guidingButtonsWrapper}>
                    <GuidingButton progressGuideline={progressGuideline} />
                </div>
            break;
    }


    return (
        <div className={`PageWrapper`}>
            <div className={` floatContentWrapper twoColumnWrapper ${styles.cartListAndACtionWrapper}`}>

                {/* Left Column - Cart List  */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.cartListWrapper}`}>
                    {cartListContent}
                </div>

                {/* Right Column - Cart Actions  */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    <Cost cartCostData={props.cartCostData} />
                    <Authentication authentication={props.cartListControllerData.authentication} />
                    {guideButtonContent}
                </div>

            </div>
        </div>
    )
}

export default CartList;