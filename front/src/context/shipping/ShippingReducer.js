import { PREV_STEP, NEXT_STEP, SET_PAYMENT_METHOD, SET_SHIPPING, SET_STEP, ADD_ORDER, RESET_SHIPPING, STEP, ORDER_START, ORDER_SUCCESS, ORDER_FAILURE, SET_ORDERS } from "./ShippingActions";

const ShippingReducer = (state, action) => {
    switch (action.type) {
        case SET_SHIPPING: 
            return {
                ...state,
                shipping: action.payload
            }

        case NEXT_STEP:
            return {
                ...state,
                prevStep: state.currStep,
                currStep: state.currStep + 1
            }
        
        case PREV_STEP: 
            return {
                ...state,
                prevStep: state.currStep,
                currStep: state.currStep - 1
            }

        case SET_STEP:
            return {
                ...state,
                prevStep: state.currStep,
                currStep: action.payload
            }

        case SET_PAYMENT_METHOD:
            return {
                ...state,
                payment: action.payload
            }

        case ORDER_START:
            return {
                ...state,
                isFetching: true
            }
            
        case ORDER_SUCCESS:
            console.log("HELLOOOO");
            let clone = state.orders.slice(0);
            clone.push(action.payload);

            localStorage.setItem("orders", JSON.stringify(clone));
            return {
                ...state,
                orders: clone,
                isFetching: false,
                currStep: STEP.CONFIRM
            }
        
        case ORDER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case RESET_SHIPPING:
            localStorage.removeItem("shipping");
            localStorage.removeItem("payment");
            localStorage.removeItem("currStep");

            return {
                ...state,
                shipping: { 
                    fullName: "",
                    address: "",
                    country: "",
                    postalCode: "",
                    city: "",
                },
                payment: "PayPal",
                currStep: STEP.CONFIRM
            }

        case SET_ORDERS:
            localStorage.setItem("orders", JSON.stringify(action.payload));
            return {
                ...state,
                orders: action.payload
            }
            
        default:
            return state;
    }

}

export default ShippingReducer
