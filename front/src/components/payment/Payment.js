import { useContext, useEffect, useState } from "react";
import { NEXT_STEP, SET_PAYMENT_METHOD } from "../../context/shipping/ShippingActions";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import { useCustomRef } from "../../utils/utils";
import classes from "./payment.module.css";

const Payment = () => {

    const { payment, dispatch } = useContext(ShippingContext);
    const paymentRef = useCustomRef(payment);

    const savePayment = () => {
        localStorage.setItem("payment", paymentRef.current);
    }

    useEffect(() => {
        window.addEventListener("beforeunload", savePayment);

        return () => {
            window.removeEventListener("beforeunload", savePayment);
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: NEXT_STEP });
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <h1>Payment</h1>
            </div>

            <div className={classes.item}>
                <label 
                    htmlFor="paypal"
                    className={classes.container}
                    >PayPal
                    <input 
                        className={classes.radioButton}
                        type="radio" 
                        id="paypal" 
                        value="PayPal" 
                        name="paymentMethod" 
                        required
                        checked={payment === "PayPal"}
                        onChange={() => dispatch({ type: SET_PAYMENT_METHOD, payload: "PayPal" })}
                        />
                    <span className={classes.checkmark}></span>
                </label>
            </div>

            <div className={classes.item}>
                <label 
                    htmlFor="stripe"
                    className={classes.container}
                    >Stripe
                    <input 
                        className={classes.radioButton}
                        type="radio" 
                        id="stripe" 
                        value="Stripe" 
                        name="paymentMethod" 
                        required
                        checked={payment === "Stripe"}
                        onChange={() => dispatch({ type: SET_PAYMENT_METHOD, payload: "Stripe" })}
                        />
                    <span className={classes.checkmark}></span>
                </label>
            </div>

            <div>
                <button className={classes.submitButton} type="submit">
                    Continue
                </button>
            </div>
        </form>
    )
}

export default Payment
