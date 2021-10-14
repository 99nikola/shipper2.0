import classes from "./infoProduct.module.css";
import { MdAddShoppingCart } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { AddProductForm, Rating } from "../Components";
import { CartContext } from "../../context/cart/CartContext";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";

const InfoProduct = ({ product, updateHandler, updated }) => {

    const { authorized } = useContext(AuthContext);
    const { cartItems, set, dispatch } = useContext(CartContext);
    const [ editMode, setEditMode ] = useState(false);

    const editHandler = () => {
        setEditMode(!editMode);
    }

    const cartHandler = () => {
        let clone, deletion;
        if (set.has(product.id)) {
            clone = cartItems.filter(item => item.id !== product.id);
            set.delete(product.id);
        } else {
            clone = cartItems.slice(0);
            clone.push(product);
            set.add(product.id);
        }
        dispatch({ type: SET_CART_ITEMS, payload: clone });
    }

    return (
        <div className={classes.container}>

            
            <div className={classes.info}>
            {editMode 
                ? <AddProductForm 
                    values={product} 
                    callBackHandler={editHandler}
                    update={product.id}
                    updateHandler={updateHandler}
                    updated={updated}
                    />
                : (
                    <div>
                        <h1>Product name: {product.name}</h1>
                        <h2>Price: ${product.price}  </h2>
                        <h2>Available: {product.quantity} </h2>
                        <h2>Date added: {product.dateAdded} </h2>
                        <h2> <Rating num={product.rating} /> </h2>
                    </div>
                )
            }

                {authorized 
                    ? (
                        <button 
                            className={classes.addToCart} 
                            onClick={editHandler}
                            >
                            <FiEdit className={classes.addToCartIcon} />
                            <h3>Eddit product</h3>
                        </button>
                    )
                    : (
                        <button 
                            className={classes.addToCart}
                            onClick={cartHandler}
                            >
                            <MdAddShoppingCart className={classes.addToCartIcon} />
                            <h3>{set.has(product.id) ? "Remove from cart" : "Add to cart"}</h3>
                        </button>
                    )}
            </div>


            <div>
                <h1>REVIEWS/COMMENTS</h1>
            </div>
        </div>
    )
}

export default InfoProduct
