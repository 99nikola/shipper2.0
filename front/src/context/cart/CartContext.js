import { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

const INITIAL_STATE = {
    cartItems: [],
    set: localStorage.getItem("cart") ? new Set(JSON.parse(localStorage.getItem("cart"))) :  new Set()
};

export const CartContext = createContext(INITIAL_STATE);


export const CartProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(CartReducer, INITIAL_STATE);

    return (
        <CartContext.Provider
            value={{
                ...state,
                dispatch
            }}
            >
            {children}
        </CartContext.Provider>
    );
}