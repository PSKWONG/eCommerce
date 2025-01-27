//---------------------- Impoort Modules ----------------------

import { useEffect, useState } from "react";
import styles from'../../components/cart/cartItem/cartItem.module.css';
import updateIcon from '../../assets/images/updateIcon.png';
import deleteIcon from '../../assets/images/deleteIcon.png';



const useCartListItemControllerData = (updateCartItemData, cartListProgress) => {

    //---------------------- Controller State ----------------------
    const [cartStatus , setCartStatus] = useState(cartListProgress);
    const [quantityStatus, setQuantityStatus] = useState(false);
    const [counterStatus, setCounterStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [removeStatus, setRemoveStatus] = useState(true);

    //----------------------Imported Data ----------------------
    //Extract cart Item Status Data
    const cartItemStatusData = updateCartItemData.cartItemStatusData 
    const { isUpdated } = cartItemStatusData;
    const { handleUpdateCartItem, handleDeleteCartItem } = updateCartItemData.cartItemUpdateHandlers;

    //----------------------Actions ----------------------
    //Update the Cart Status
    useEffect(()=>{
        setCartStatus(cartListProgress);
    },[cartListProgress, cartStatus]);

    //Control the Cart Icon based on the Cart Status 
    useEffect(()=>{
        switch (cartStatus){
            case 1:
                setQuantityStatus(false);
                setCounterStatus(true);
                setUpdateStatus(false);
                setRemoveStatus(true);
                break;
            case 2:
                setQuantityStatus(true);
                setCounterStatus(false);
                setUpdateStatus(false);
                setRemoveStatus(false);
                break;
        }

    },[cartStatus]);
    

    //Control the Quantity Icon Status

    useEffect(()=>{
        switch (isUpdated){
            case true:
                setUpdateStatus(false);
                break;
            case false:
                setUpdateStatus(true);
                break;
        }
    }, [isUpdated]); 

    //----------------------Exported Data ----------------------
    const cartListItemControllerData = {
        quantity:{
            style : quantityStatus? styles.enabled : styles.disabled 
        },
        counter:{
            style : counterStatus? styles.enabled : styles.disabled 
        },
        updateIcon: {
            icon: updateIcon,
            style: updateStatus? styles.enableIcon : styles.disableIcon,
            action : updateStatus? handleUpdateCartItem : null
        },
        deleteIcon:{
            icon: deleteIcon,
            style: removeStatus? styles.enableIcon : styles.disableIcon,
            action : removeStatus? handleDeleteCartItem : null
        }
    }

    return cartListItemControllerData;

}; 

export default useCartListItemControllerData;