//---------------------- Import Components ----------------------
import React, { useEffect, useState } from 'react';


// This is a custom hook as a middleware 
// for controlling the "Update" icon in Product Detail Page 
const useProductCartUpdateData =(data)=>{

    //------------------ Cart Update States ------------------
    const [command, setCommand] = useState('Add to Cart');

    //------------------ External Data ------------------// 
    const { isExist, isUpdated, isPendingRemoval } = data.cartItemStatusData; 

    //------------------ Actions ------------------
    useEffect(()=>{

        switch(true){
            case isExist && isPendingRemoval:
                setCommand('Add to Cart');
                break;
            case isExist && !isPendingRemoval && !isUpdated:
                setCommand('Update the cart');
                break;
            case isExist && !isPendingRemoval && isUpdated:
                setCommand('Updated');
                break;
            default:
                setCommand('Add to Cart');
        }

    }, [isExist, isUpdated, isPendingRemoval]);

        return {command};

}; 

export default useProductCartUpdateData;