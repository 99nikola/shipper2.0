import classes from "./cart.module.css";
import { CheckoutSteps, Orders } from "../../components/Components";
import { useContext, useEffect } from "react";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import SwitchRender from "./SwitchRender";
import { useCustomRef } from "../../utils/utils";
import { CartContext } from "../../context/cart/CartContext";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";
import { PREV_STEP, RESET_SHIPPING, SET_STEP, STEP } from "../../context/shipping/ShippingActions";
import { AuthContext } from "../../context/auth/AuthContext";

const Cart = () => {

    const { currStep, dispatch: shippDispatch } = useContext(ShippingContext);
    const { loggedIn } = useContext(AuthContext);
    const { cartItems, dispatch: cartDispatch } = useContext(CartContext);
    const stepRef = useCustomRef(currStep);

    const saveStep = () => {
        localStorage.setItem("currStep", JSON.stringify(stepRef.current));
    }
    
    useEffect(() => {
        window.addEventListener("beforeunload", saveStep);
        
        return () => {
            window.removeEventListener("beforeunload", saveStep);
            saveStep();
        }
    }, []);

    const cancelHandler = () => {
        cartDispatch({ type: SET_CART_ITEMS, payload: [] });
        shippDispatch({ type: RESET_SHIPPING });
        
    }

    const backHandler = () => {
        if (currStep === STEP.SHIPPING && loggedIn) {
            shippDispatch({ type: SET_STEP, payload: STEP.CONFIRM });
            return;
        }

        shippDispatch({ type: PREV_STEP });
    }

    return (
        <div className={classes.container}>
            <CheckoutSteps step={currStep} />
            <SwitchRender step={currStep} />

            {currStep !== STEP.CONFIRM || cartItems.length !== 0 
                && (
                <button 
                    className={classes.cancelButton}
                    onClick={cancelHandler}
                    >
                    Cancel</button>
                )}
            {currStep !== STEP.CONFIRM && (
            <button 
                className={classes.cancelButton}
                onClick={backHandler}
                >
                Back
            </button>
            )}
        </div>
    );
}

export default Cart
