//--------------------- Import Modules ---------------------
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addServerCartItem, updateCartItem, updateServerCartItem } from '../../features/cart/cartSlice';
import { selectIsAuthenticated } from '../../features/authentication/authenticationSlice';




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
    } = cartItemStates;

    const isAuthenticated = useSelector(selectIsAuthenticated)

    //Custom Actions
    const dispatch = useDispatch();

    const handleCartItems = (e) => {

        e.preventDefault();
        let productItemToCart = {}

        switch (true) {
            case isAuthenticated && !isExist:
                productItemToCart = { ...product_item, quantity: count };
                dispatch(addServerCartItem(productItemToCart));
                break;
            case isAuthenticated && isExist:
                productItemToCart = { ...product_item, quantity: count };
                dispatch(updateServerCartItem(productItemToCart));
                break;

            case !isAuthenticated && isExist:
                productItemToCart = { ...product_item, quantity: count };
                dispatch(updateCartItem(productItemToCart));
                break;

            case !isAuthenticated && !isExist :
                productItemToCart = { ...product_item, quantity: count };
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