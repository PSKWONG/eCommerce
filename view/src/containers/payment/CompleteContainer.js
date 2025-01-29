//---------------Import Modules-------------------
import React from 'react';
import useCompletePageData from './completePageData';


const CompletePageContainer = ()=>{
    
    const completePageData = useCompletePageData();

    return(
        <div>
            <h1>Checkout</h1>
        </div>
    )
}

export default CompletePageContainer;