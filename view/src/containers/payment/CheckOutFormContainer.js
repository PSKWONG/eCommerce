//------------------- Import Modules --------------------------
import React from "react";

import CheckoutForm from "../../components/payment/CheckoutForm";
import useCheckOutFormData from "./CheckOutFormData";



const CheckoutFormContainer = (data) => {
    


    //Checkout form Core data
    const checkOutFormData = useCheckOutFormData();

    //Optional Data from other components
    const formController = data.formController || null; 

    return (
        <>
            <CheckoutForm
                checkOutFormData={checkOutFormData}
                formController={formController}
            />
        </>
    );

};

export default CheckoutFormContainer;