// ---------------------------- Import Modules ---------------------------
import React from "react";




//-------------------------- Import Components --------------------------
import '../../assets/styles/App.css';
import underMaintainIcon from '../../assets/images/maintain.png';





// ---------------------------- QuantityCount Component ----------------------------
const QuantityCount = (props) => {

    //---------------------------Extract Data ---------------------------
    const counterData = props.counterData || {};
    const displaystyle = props.counterDisplayStyle || null; 

    //-------------------------- Conditional Rendering ------------------
    //Check the intiquity of the productDetail
    const isEmpty = Object.keys(counterData).length === 0;

    //Set Variable for the Conditional Contents
    let content;

    //Conditional Switching
    switch (true) {
        case isEmpty:
            content =
                <>
                    <img src={underMaintainIcon} alt="Under Maintainance" />
                </>;
            break;

        case !isEmpty:
            const { count } = counterData;
            const { handleIncrement, handleDecrement } = counterData.actions;
            content =
                <>
                    <div className={`quantityCountWrapper ${displaystyle}`}>
                        <button onClick={handleDecrement} value={`-`}> - </button>
                        <span>{count}</span>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                </>
            break;
    }

    return (
        <>
            {content}
        </>
    );
};

export default QuantityCount;


