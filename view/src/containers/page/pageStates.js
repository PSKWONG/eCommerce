//----------------------------- Import Modules -----------------------------
import { useState } from "react";   

//----------------------------- Page States -----------------------------


const usePageStates = () => {
    const [authenStatus, setAuthenStatus] = useState(false);

    return{
        authenStatus, setAuthenStatus

    }
}; 

export default usePageStates;