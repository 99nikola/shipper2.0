import classes from "./product.module.css"
import { useContext, useState } from "react"
import { MdDeleteForever } from 'react-icons/md'
import { AuthContext } from "../../context/auth/AuthContext"
import axios from "axios"
import { ProductsContext } from "../../context/products/ProductsContext"
import { MANUAL_UPDATE } from "../../context/products/ProductsActions"
import { Link } from "react-router-dom"


const Product = ({ values, plus }) => {
    
    const { id, name, price, quantity, image, soldCount, description, seller_un  } = values;
    const [ deleted, setDeleted ] = useState(false);
    const { user, authorized } = useContext(AuthContext);
    const { dispatch } = useContext(ProductsContext);

    const removeHandler = async () => {
        try {
            const ans = window.confirm(`Product ${name} will be removed, continue?`);
            if (ans) {
                await axios.delete(`http://localhost:3030/api/products/remove/${id}/${user.username}`);
                setDeleted(true);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    if (deleted) {
        setTimeout(() => {
            dispatch({ type: MANUAL_UPDATE });
            setDeleted(false);
        }, 1000);

        return (
            <div className={classes.deleted}>
                <h4>Product successfully deleted.</h4>
            </div>
        );
    }

    return (
        <div className={classes.product}>
        {authorized && 
            <MdDeleteForever 
                onClick={removeHandler} 
                className={classes.remove} 
            />}
            <Link to={`/${seller_un}/product/${id}`} className={classes.link}>
                <div className={plus ? `${classes.container} ${classes.plus}` : classes.container}>
                    <img 
                        className={classes.image}
                        src={image} 
                        alt={name}
                    />

                    <div className={classes.info}>
                        <p className={classes.pame}>{name}</p>
                        <p className={classes.price}>{price}$</p>
                        <p className={classes.quantity}>available: {quantity}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Product
