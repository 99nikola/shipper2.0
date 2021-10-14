import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./order.module.css";

const OrderItems = ({ products }) => {

    const [ images, setImages ] = useState(); 

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.put("http://localhost:3030/api/orders/products", { products });
                setImages(data.images);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    if (images === undefined)
        return <></>;

    return (
        <>
            <h2>Order Items</h2>
            <div className={classes.items}>
                {images.map((item, index) => {
                    return (
                        <div className={classes.orderItem} key={index}>
                            <img className={classes.orderItemImg} src={item.image} />
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default OrderItems
