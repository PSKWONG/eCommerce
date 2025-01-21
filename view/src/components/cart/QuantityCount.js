// ---------------------------- Import Modules ---------------------------
import React from "react";




//-------------------------- Import Components --------------------------
import '../../assets/styles/App.css';





// ---------------------------- QuantityCount Component ----------------------------
const QuantityCount = (data) => {

    const {cartItemStates, cartHandlers} = data;
    const {count }= cartItemStates;
    const {handleIncrement, handleDecrement} = cartHandlers; 

    return (
        <div className="quantityCountWrapper">
            <button onClick={handleDecrement} value={`-`}> - </button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityCount;


