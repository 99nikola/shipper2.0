import { CartItems, Payment, PlaceOrder, ShippingForm } from "../../components/Components";
import { STEP } from "../../context/shipping/ShippingActions";
import Login from "../auth/Login";

const SwitchRender = ({ step }) => {
    switch (step) {
        case STEP.CONFIRM:
            return (
                <CartItems />
            );

        case STEP.LOGIN:
            return (
                <Login />
            );
        
        case STEP.SHIPPING:
            return (
                <ShippingForm />
            );

        case STEP.PAYMENT: 
            return (
                <Payment />
            );
        
        case STEP.PLACE_ORDER:
            return (
                <PlaceOrder />
            );
        default:
            return <></>;
    }    
}

export default SwitchRender;
