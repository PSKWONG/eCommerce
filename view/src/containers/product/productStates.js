//-------------------------- Import Modules --------------------------
import React, { useState } from 'react';






//-------------------------- Product States --------------------------
export const useProductStates = () => {
    const [product_id, setProduct_id] = useState(0);
    return { product_id, setProduct_id };
};

