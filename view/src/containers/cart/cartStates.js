//--------------------------- Import Modules ---------------------------
import { useState } from "react";





// --------------------------- Import Components  ---------------------------




//------------------------- Quantity Counter States -------------------------
export const useQtyCounterStates = () => {
    const [count, setCount] = useState(0);

    return { count, setCount };
}