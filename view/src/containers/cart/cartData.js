//-------------------- Import Modules --------------------------
import { useSelector } from "react-redux";

// --------------------- Import Components ---------------------
import {selectCartData} from '../../features/cart/cartSlice'


//---------------------------- Cart Data Component ----------------------------


export const useCartListData = ()=>{
    console.log('This is the cartListData:');
    const cartListData  = useSelector(selectCartData);

    return cartListData; 
}; 