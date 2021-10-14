import { STEP } from "../../context/shipping/ShippingActions";
import classes from "./checkoutSteps.module.css";
import { TiTick } from "react-icons/ti";

const CheckoutSteps = ({ step }) => {
    return (
        <div className={`${classes.row} ${classes.checkoutSteps}`}>
            <div className={step >= STEP.CONFIRM ? classes.active : ""}>
                Cart
                {step > STEP.CONFIRM && <TiTick className={classes.tickIcon}/>}
            </div>

            <div className={step >= STEP.LOGIN ? classes.active : ""}>
                Login
                {step > STEP.LOGIN && <TiTick className={classes.tickIcon}/>}
            </div>

            <div className={step >= STEP.SHIPPING ? classes.active : ""}>
                Shipping
                {step > STEP.SHIPPING && <TiTick className={classes.tickIcon}/>}
            </div>

            <div className={step >= STEP.PAYMENT ? classes.active : ""}>
                Payment
                {step > STEP.PAYMENT && <TiTick className={classes.tickIcon}/>}
            </div>

            <div className={step >= STEP.PLACE_ORDER ? classes.active : ""}>
                Place Order
                {step > STEP.PLACE_ORDER && <TiTick className={classes.tickIcon}/>}
            </div>
        </div>
    );
}

export default CheckoutSteps
