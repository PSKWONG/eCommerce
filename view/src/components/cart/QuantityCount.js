// ---------------------------- Import Modules ---------------------------
import React from "react";




//-------------------------- Import Components --------------------------
import '../../assets/styles/App.css';





// ---------------------------- QuantityCount Component ----------------------------
const QuantityCount = (props) => {

    //Set default Value 
    const defaultValue = {
        cartItemStates: {
            count: 0
        },
        cartHandlers: {
            handleIncrement: () => { },
            handleDecrement: () => { }
        }
    }

    //Extract data from props
    const { 
        cartItemStates =  defaultValue.cartItemStates, 
        cartHandlers = defaultValue.cartHandlers } = props;
    const {count}   = cartItemStates;
    const { handleIncrement, handleDecrement } = cartHandlers;

    return (
        <div className="quantityCountWrapper">
            <button onClick={handleDecrement} value={`-`}> - </button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityCount;


