import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./order.module.css";
import OrderItems from "./OrderItems";

const Order = ({ id }) => {

    const [ order, setOrder ] = useState();
    const [ products, setProducts ] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3030/api/orders/orderId/${id}`);
                setOrder(data.order);
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);


    if (order === undefined) 
        return (
            <></>
        );

    return (
        <div className={classes.order}>
            <div className={classes.shipping}>
                <h2>Shipping</h2>
                <div className={classes.info}>
                    <div className={classes.leftInfo}>
                        <p>
                            <strong>Name: </strong> {order.fullName} <br />
                            <strong>Address: </strong> {order.address} <br />
                            {order.city}, {order.postalCode}, {order.country}
                        </p>    
                    </div>
                    
                    <div className={classes.rightInfo}>
                        <h5>Is Paid: {order.isPaid === 0 ? "NO" : "YES"}</h5>
                        <h5>Is Delivered: {order.isDelivered === 0 ? "NO" : "YES"}</h5>
                        <h5>Order At: {order.timestamp}</h5>
                    </div>
                </div>

                {products !== undefined && <OrderItems products={products}/>}
            </div>
        </div>
    )
}

export default Order
