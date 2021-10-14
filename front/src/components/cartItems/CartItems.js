import classes from "./cartItems.module.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";
import { CartContext } from "../../context/cart/CartContext";
import { SET_ITEMS } from "../../context/slider/SliderActions";
import { SliderContext } from "../../context/slider/SliderContext";
import { useCartAutoSave } from "../../utils/utils";
import CartProduct from "./CartProduct";
import { Slider } from "../Components";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import { NEXT_STEP, SET_STEP, STEP } from "../../context/shipping/ShippingActions";
import { AuthContext } from "../../context/auth/AuthContext";

const CartItems = () => {

    const { dispatch } = useContext(SliderContext);

    const { cartItems, set, deletion, dispatch: cartDispatch } = useContext(CartContext);
    useCartAutoSave(cartItems, set, deletion);
    
    const { dispatch: shippingDispatch } = useContext(ShippingContext);

    const { loggedIn } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const cartIds = JSON.parse(localStorage.getItem("cart"));
                if (cartIds === null || cartIds.length === 0) return;
                
                const { data } = await axios.post("http://localhost:3030/api/feed/cart", { 
                    ids: cartIds  
                });
    
                cartDispatch({ type: SET_CART_ITEMS, payload: data.products });
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        dispatch({ type: SET_ITEMS, payload: cartItems });
        return () => dispatch({ type: SET_ITEMS, payload: [] });
    }, [cartItems]);

    const nextStepHandler = () => {
        if (loggedIn) {
            shippingDispatch({ type: SET_STEP, payload: STEP.SHIPPING });
        } else {
            shippingDispatch({ type: NEXT_STEP });
        }
    }

    if (cartItems.length === 0) 
        return (
            <div className={classes.container}>
                <h1>No products in cart</h1>
            </div>
        );


    return (
        <div className={classes.container}>
            <div className={classes.cartSlider}>
                <Slider Component={CartProduct} />
            </div>
            <button 
                    className={classes.submitButton} 
                    type="submit"
                    onClick={nextStepHandler}
                    >
                    Confirm
            </button>
        </div>
        
    );
}

export default CartItems
