//------------------------ Import Modules --------------------------

import { useEffect, useState } from "react";
import { paymentAPI } from "../../features/api/API";

const useStripleData = () => {

    //Create state to store the client secret
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const fetchClientSecret = async () => {
            try {
                const requestBody =
                {
                    items: [
                        {
                            id: "xl-tshirt",
                            quantity: 1,
                            amount: 1000
                        }
                    ]
                }
                const response = await paymentAPI(requestBody);
                console.log('This is the response from initial request to striple:', response);
                setClientSecret(response.data.clientSecret);
                return;

            } catch (error) {
                console.error('Payment API error:', error);
            }
        };

        fetchClientSecret();

    }, []);

    //------------------------Exported Striple Data --------------------------
    const appearance = {
        theme: 'stripe',
    };

    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';


    const stripleData = {
        options:{
            clientSecret,
            appearance,
            loader
        }
    }




    return stripleData;


};
export default useStripleData;