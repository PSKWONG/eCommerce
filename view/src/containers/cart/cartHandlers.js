//--------------------- Import Modules ---------------------
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateCartItem } from '../../features/cart/cartSlice';





//--------------------- Cart Handlers ---------------------

const useCartHandlers = () => {


};

export default useCartHandlers;


export const useProductCartHandlers = (data) => {

    const { cartItemStates } = data;
    const {
        product_item, 
        isExist,
        count,
        setCount,
        setIsPendingRemoval
    } = cartItemStates;

    //Custom Actions
    const dispatch = useDispatch();

    const handleCartItems = (e) => {

        e.preventDefault();
        let productItemToCart = {}

        switch (true) {
            case isExist && count != 0:
                setIsPendingRemoval(false);
                productItemToCart = {...product_item, quantity: count};
                dispatch(updateCartItem(productItemToCart));
                break;

            case isExist && count == 0:
                setIsPendingRemoval(true);
                productItemToCart = {...product_item, quantity: count};
                dispatch(updateCartItem(productItemToCart));
                break;

            case !isExist && count != 0:
                productItemToCart = {...product_item, quantity: count};
                dispatch(addItemToCart(productItemToCart));
                break

            default:
                break;
        }
    };

    const handleIncrement = (e) => {
        e.preventDefault();
        if (count >= 0) {
            setCount(count + 1);
        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return {
        handleCartItems, handleIncrement, handleDecrement
    }
}