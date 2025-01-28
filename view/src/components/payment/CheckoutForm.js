import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import styles from  '../../components/cart/cartList/CartList.module.css';

export default function CheckoutForm(porps) {

    // Destructure the props - Core Data
    const {handlers, status, paymentElementOptions} = porps.checkOutFormData;
    const {onSubmit} = handlers;
    const {message, isLoading, stripe, elements} = status;

    // Destructure the props - Optional Data
    const formController = porps.formController || null;

    return (
        <form id="payment-form" onSubmit={onSubmit} className={formController.style}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className={styles.checkOutFormSubmit}>
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}