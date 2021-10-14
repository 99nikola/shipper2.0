import { createContext, useReducer } from "react";
import { STEP } from "./ShippingActions";
import ShippingReducer from "./ShippingReducer";

const INITIAL_STATE = {
    shipping: localStorage.getItem("shipping") 
        ? JSON.parse(localStorage.getItem("shipping"))
        : { 
            fullName: "",
            address: "",
            country: "",
            postalCode: "",
            city: "",
        },
    payment: localStorage.getItem("payment") || "PayPal",
    currStep: localStorage.getItem("currStep")
        ? parseInt(localStorage.getItem("currStep"))
        : STEP.CONFIRM,
    prevStep: null,
    orders: localStorage.getItem("orders") 
        ? JSON.parse(localStorage.getItem("orders"))
        : [],
        
    isFetching: false,
    error: null
}

export const ShippingContext = createContext(INITIAL_STATE);

export const ShippingProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(ShippingReducer, INITIAL_STATE);


    return (
        <ShippingContext.Provider
            value={{
                ...state,
                dispatch
            }}>
            {children}
        </ShippingContext.Provider>
    );
}
