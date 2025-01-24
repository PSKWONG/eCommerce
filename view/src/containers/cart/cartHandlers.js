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
        cartItem,setCartItem,
        isExist,
        setIsUpdated,
        count,setCount,
    } = cartItemStates;

    const isAuthenticated = useSelector(selectIsAuthenticated)

    //Custom Actions
    const dispatch = useDispatch();

    const handleCartItems = (e) => {

        e.preventDefault();
        let productItemToCart = {...cartItem}; 
        productItemToCart.quantity = count;

        switch (true) {
            case isAuthenticated && !isExist:
                dispatch(addServerCartItem(productItemToCart));
                setIsUpdated(true);
                break;
            case isAuthenticated && isExist:
                dispatch(updateServerCartItem(productItemToCart));
                setIsUpdated(true);
                break;

            case !isAuthenticated && isExist:
                console.log('This is the productItemToCart to update:',productItemToCart);
                dispatch(updateCartItem(productItemToCart));
                setIsUpdated(true);
                break;

            case !isAuthenticated && !isExist :
                console.log('This is the productItemToCart to add:',productItemToCart);
                dispatch(addItemToCart(productItemToCart));
                setIsUpdated(true);
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