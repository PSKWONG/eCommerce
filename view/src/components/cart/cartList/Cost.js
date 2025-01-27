// ----------------------- Import Modules ----------------------
import React from 'react';



const Cost = (props) => {

    //------------------------ Cost Data ------------------------
    const { cartTotal } = props.cartCostData

    //------------------------ Conditional Rendering ------------------------
    let content;

    switch (true) {
        case cartTotal === 0:
            content = <></>
            break;
        default:
            content =
                <div>
                    <div>Total Cost: </div>
                    <h3>{cartTotal}</h3>
                </div>
                
            break;
    }

    return(
        <>
            {content}
        </>
    )

}

export default Cost;