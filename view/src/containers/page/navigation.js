//------------------ Import Modules ------------------
import React from "react";

// ------------------ Import Components ------------------

const useNavigationData = () => {

    const navigation = {
        navigationItems: [
            { name: "Products", url: "/product/list/2" },
            { name: "Accessories", url: "/product/list/1" },
        ]
    }

    return navigation; 
};

export default useNavigationData;