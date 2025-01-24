//-------------------- Import Modules --------------------------
import { useSelector } from "react-redux";

// --------------------- Import Components ---------------------
import { selectCartData } from '../../features/cart/cartSlice'


//---------------------------- Cart Data Component ----------------------------
const useCartItemTemplate = () => {
    const defaultCartData = {
        item: {
            product_id: 0,
            description: 'Product  Description',
            product_name: 'Product',
            unit_price: "$0.00",
            quantity: 0
        },
        counter: {
            cartItemStates: {
                count: 0
            },
            cartHandlers: {
                handleIncrement: () => { },
                handleDecrement: () => { }
            }
        },
        action: {
            update: true,
            remove: true
        }
    }

    return defaultCartData;
}

export default useCartItemTemplate;


export const useCartItemData = (data) => {

    
    const cartItemData = useCartItemTemplate();

    //Put new value into template
    const { cartItemStates } = data;
    cartItemData.item = cartItemStates.cartItem;

    //Put new value into Counter 
    const {carttHandler} = data 
    cartItemData.counter.cartItemStates.count = cartItemStates.count;
    cartItemData.counter.cartHandlers.handleIncrement = carttHandler.handleIncrement; 
    cartItemData.counter.cartHandlers.handleDecrement = carttHandler.handleDecrement;
    

    return cartItemData;
};

export const useCartListData = () => {

    const cartListData = useSelector(selectCartData);
    console.log('This is the cartListData:', cartListData);

    return cartListData;
}; 