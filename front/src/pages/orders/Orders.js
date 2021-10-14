import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { SET_ORDERS } from "../../context/shipping/ShippingActions";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import classes from "./orders.module.css";
import { Order } from "../../components/Components";

const Orders = () => {

    const { orders, dispatch } = useContext(ShippingContext);
    const { loggedIn, user } = useContext(AuthContext);

    useEffect(() => {
        if (!loggedIn) return;
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3030/api/orders/username/${user.username}`);
                dispatch({ type: SET_ORDERS, payload: data.orders });
                console.log(data.orders);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [loggedIn]);

    if (!orders || orders.length === 0) 
        return (
            <h1>No Orders</h1>
        );

    return (
        <div className={classes.orders}>
        {orders.map((id)=>
            <div key={id}>
                <Order id={id} />
            </div>
        )}
        </div>
    )
}

export default Orders
