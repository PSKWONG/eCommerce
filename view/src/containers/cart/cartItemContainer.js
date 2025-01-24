// -------------------------- Import Modules  --------------------------
import React, { useEffect, useMemo } from 'react';


///-------------------------- Import Components  --------------------------
import CartItem from '../../components/cart/listItem/listItem';
import { useCartItemStates } from '../../containers/cart/cartStates';
import { useCartItemEffect } from '../../containers/cart/cartEffectHook';
import { useCartListData, useCartItemData } from '../../containers/cart/cartData';
import { useProductCartHandlers } from './cartHandlers';

// ----------------------- Cart Item Container  -----------------------

const CartItemContainer = (props) => {

    //Cart Item Basic Info
    //const cartItemInfo = props.info

    const cartItemInfo = {
        
            product_id: 6,
            product_name: "Aloe Vera - Succulent Plant",
            description: "Aloe Vera is a succulent plant long used to heal burns and cuts.  Today an extract from the leaves is used as the basis of many cosmetics, especially to soothe sunburnt skin. Aloe Vera really is famous for the healing power in its succulent leaves. Just break off a piece and squeeze the juice onto blisters, sunburn and stings.  A very easy and striking houseplant that no home should be without, it will thrive in any room or even on a patio in the summer.  Tolerant of drought, and those that occasionally forget to water their house plants!  Supplied in an approx. 12cm diameter pot, with an overall height of approx. 30-35cm, simply position and enjoy.",
            unit_price: "$5.97",
            image_path: "Aloe_Vera.jpg",
            quantity: 1
        

    }

    //Cart Item States
    const cartItemStates = useCartItemStates();

    //Cart List Data
    const cartListData = useCartListData();


    //Cart Item  Handlers
    const carttHandler = useProductCartHandlers({ cartItemStates });


    //Cart Item Data
    const cartItemData = useCartItemData({ cartItemStates, carttHandler });



    //Cart Item Effect

    useMemo(()=>{
        cartItemStates.setCartItem(cartItemInfo);
    }, []);

    useCartItemEffect({ cartItemStates, cartListData });

    return <CartItem {...cartItemData} />;
}
export default CartItemContainer;