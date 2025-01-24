// ---------------------- Import Modules ----------------------
import React from 'react';


// ---------------------- Import Components ----------------------
import useCartItemTemplate from '../../../containers/cart/cartData';
import QuantityCount from '../QuantityCount'



// ---------------------- Cart Item Container ----------------------
const CartItem = (props) => {

    //default value of cartItem
    const defaultValue = useCartItemTemplate();
    
    const { 
        item = defaultValue.item, 
        counter = defaultValue.counter, 
        action = defaultValue.action 
    } = props;

    const {product_name, unit_price} = item; 


    return (
        <div>
            <span>{product_name}</span>
            <QuantityCount {...counter} />
        </div>
    )
};

export default CartItem;