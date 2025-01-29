//-------------------- Import Modules --------------------
import React from 'react';
import { useSelector } from 'react-redux';


//-------------------- Import Componenets --------------------
//Assets
import '../../assets/styles/App.css';
import styles from './payment.module.css';

import Cost from '../cart/cartList/Cost'
import CheckoutFormContainer from '../../containers/payment/CheckOutFormContainer'; 

import { selectCartCost } from '../../features/cart/cartSlice';



const CheckOutPage = (props) => {

    const cartCostData = useSelector(selectCartCost); 

    return (
        <div className={`PageWrapper`}>
            <div className={` floatContentWrapper twoColumnWrapper ${styles.paymentAndACtionWrapper}`}>

                {/* Left Column - Payment Form  */}
                <div className={` leftColumn ${styles.contentWrapper} ${styles.checkOutFormtWrapper}`}>
                    <h3>Complete the payment form</h3>
                    <CheckoutFormContainer />
                </div>

                {/* Right Column - Cart Actions  */}
                <div className={` rightColumn ${styles.contentWrapper} ${styles.actionWrapper} `}>
                    <Cost cartCostData={cartCostData} />
                </div>

            </div>
        </div>
    )
}

export default CheckOutPage;