import classes from "./product.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SET_AUTHORITY } from "../../context/auth/AuthActions";
import { AuthContext } from "../../context/auth/AuthContext";
import { ImageSlider, InfoProduct } from "../../components/Components";
import { CartContext } from "../../context/cart/CartContext";
import { useCartAutoSave } from "../../utils/utils";

const ProductPage = () => {

    const { username, id } = useParams();
    const { loggedIn, user, dispatch } = useContext(AuthContext);
    const { cartItems, set, deletion } = useContext(CartContext);
    const [ product, setProduct ] = useState(null);
    const [ images, setImages ] = useState([]);
    const [ updated, setUpdated] = useState(0);
    useCartAutoSave(cartItems, set);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3030/api/feed/${username}/${id}`);
            setProduct(data.product);
            setImages(data.images);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProduct();
        return () => dispatch({ type: SET_AUTHORITY, payload: false });
    }, []);
    
    useEffect(() => {
        fetchProduct();
    }, [updated]);

    useEffect(() => {
        if (loggedIn && user.username === username) {
            dispatch({ type: SET_AUTHORITY, payload: true });
        }
        return () => dispatch({ type: SET_AUTHORITY, payload: false });
    }, [loggedIn]);


    if (product === null)
        return <></>;

    return (
        <div className={classes.container}>
            <ImageSlider images={images} />
            <InfoProduct product={{...product, images}} updateHandler={setUpdated} updated={updated} />
        </div>
    )
}

export default ProductPage
