// ---------------------------- Import Modules ---------------------------
import React from "react";




//-------------------------- Import Components --------------------------
import '../../assets/styles/App.css';





// ---------------------------- QuantityCount Component ----------------------------
const QuantityCount = (states) => {

    const {count, setCount }= states;

    return (
        <div className="quantityCountWrapper">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
};

export default QuantityCount;


