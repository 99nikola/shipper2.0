import classes from "./cartItems.module.css";
import { Product } from "../../components/Components";
import { IoBagRemove } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";

const CartProduct = ({ values }) => {

    const { cartItems, set, dispatch } = useContext(CartContext);

    const removeFromCartHandler = (e) => {
        const id = values.id;
        set.delete(id);

        let filtered = cartItems.filter(item => item.id !== id);
        dispatch({ type: SET_CART_ITEMS, payload: filtered });
    }

    return (
        <div className={classes.cartProducts}>
            <Product 
                values={values}
                plus={true}
                />
            <IoBagRemove 
                className={classes.removeIcon} 
                onClick={removeFromCartHandler}
                />
        </div>
    )
}

export default CartProduct
