//----------------Import Modules--------------------------
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const useCheckOutFormData = () => {

    //------------------------ Create States --------------------------
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //----------------------- Handlers --------------------------
    const stripe = useStripe();
    const elements = useElements();


    // Make sure to change this to your payment completion page  <-------------------------------Reminder 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if stripe and elements are loaded
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Once Start the submission process, set the loading state to true
        setIsLoading(true);

        // Configuration on handling confirmation of payment
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:4040",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        // After Complete the submission process, set the loading state to false
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    //------------------------Exported CheckOut Form Data --------------------------
    const checkOutFormData = {
        handlers: {
            onSubmit: handleSubmit
        },
        status: {
            message,
            isLoading,
        }, 
        paymentElementOptions
    }

    return checkOutFormData;
};

export default useCheckOutFormData;