import axios from "axios";
import { useContext, useEffect } from "react";
import { SET_NUM_PRODUCTS } from "../../context/products/ProductsActions";
import { ProductsContext } from "../../context/products/ProductsContext";
import { PageNavigation, Product } from "../Components"
import classes from "./productsPanel.module.css";

const ProductsPanel = ({ plus }) => {
    
    const { category, products, store, dispatch } = useContext(ProductsContext);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:3030/api/feed/count?category=${category}&username=${store}`);
            dispatch({ type: SET_NUM_PRODUCTS, payload: data.count });
        })();
        return () => dispatch({ type: SET_NUM_PRODUCTS, payload: 0 });
    }, [category, store]);


    return (
        <>
            <div className={plus ? `${classes.products} ${classes.plus}` : classes.products}>
                {products && products.map((item, index) => 
                    <Product 
                        key={index}
                        values={item}
                        plus={plus}
                    />)}
            </div>

            <PageNavigation />
        </>
        )
}

export default ProductsPanel
