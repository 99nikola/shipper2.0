import { SET_CART_ITEMS } from "./CartActions";

const CartReducer = (state, action) => {
    switch (action.type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
                set: new Set(action.payload.map(item => item.id))
            }

        default:
            return state;
    }
};

export default CartReducer;