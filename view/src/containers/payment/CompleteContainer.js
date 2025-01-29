//---------------Import Modules-------------------
import React from 'react';
import useCompletePageData from './completePageData';

//--------------- Import Components -------------------
import CompletePage from '../../components/payment/Complete';


const CompletePageContainer = ()=>{
    
    const completePageData = useCompletePageData();

    return(
        <>
            <CompletePage {...completePageData}/>
        </>
    )
}

export default CompletePageContainer;