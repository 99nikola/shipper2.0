import classes from "./placeOrder.module.css";
import { useContext, useMemo } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import { ADD_ORDER, ORDER_FAILURE, ORDER_START, ORDER_SUCCESS, SET_STEP, STEP } from "../../context/shipping/ShippingActions";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";
import { useCartAutoSave } from "../../utils/utils";
import axios from "axios";

const  PlaceOrder = () => {

    const { shipping, payment, orders, isFetching, dispatch: shippingDispatch } = useContext(ShippingContext);
    const { address, city, country, fullName, postalCode } = shipping;
    
    const { cartItems, dispatch: cartDispatch, set } = useContext(CartContext);
    useCartAutoSave(cartItems, set,);

    const itemsPrice = useMemo(() => {
        let sum = 0;
        for (let item of cartItems) sum += item.price;
        return sum;
    }, [cartItems]);

    const shippingPrice = country !== "Crna Gora" ? 10.0 : 0.0;
    const taxPrice = useMemo(() => itemsPrice * 0.21, [itemsPrice]);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async () => {
        try {
            const body = {
                shipping: {
                    ...shipping,
                    paymentMethod: payment
                }, 
                price: {
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice
                },
                productIds: [...set]
            }
            shippingDispatch({ type: ORDER_START });

            const { data } = await axios.post("http://localhost:3030/api/orders/makeOrder", body);
            cartDispatch({ type: SET_CART_ITEMS, payload: [] });
            shippingDispatch({ type: ORDER_SUCCESS, payload: data.orderId });
        } catch (error) {
            shippingDispatch({ type: ORDER_FAILURE, payload: error });
        }

    }

    return (
        <div className={classes.container}>
            <div className={classes.shippingContainer}>
                <div className={classes.shipping}>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong> {fullName} <br />
                        <strong>Address: </strong> {address} <br />
                        {city}, {postalCode}, {country}
                    </p>    
                </div>
                
                <div className={classes.shipping}>
                    <h2>Payment</h2>
                    <div className={classes.payment}>
                        <p>
                            <strong>Method: </strong> {payment}
                        </p>
                        {payment === "PayPal"
                            ? 
                            <a 
                                href="https://stripe.com/" 
                                target="_blank"
                                >
                                <img 
                                    className={classes.paymentLogo}
                                    alt="PAYPAL"
                                    src="https://www.wisdom-drops.com/wp-content/uploads/2017/02/paypal-logo.png" />
                            </a>
                            : 
                            <a 
                                href="https://stripe.com/" 
                                target="_blank"
                                >
                                <img 
                                    className={classes.paymentLogo}
                                    alt="STRIPE"
                                    src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Symbol.png" />
                            </a>}
                    </div>
                </div>
               
                <div className={classes.shipping}>
                    <h2>Order Items</h2>
                    {cartItems.map((item, index) => {
                        return (
                            <div className={classes.orderItem} key={index}>
                                <img className={classes.orderItemImg} src={item.image} />
                                <p>{item.name}</p>
                                <p>{item.price} $</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className={classes.sumaryContainer}>
                <div className={classes.shipping}>
                    <h2>Order Sumary</h2>
                    <div className={classes.sumaryItem}>
                        <p>Items price:</p>
                        <strong>{itemsPrice.toFixed(2)} $</strong>
                    </div>

                    <div className={classes.sumaryItem}>
                        <p>Shipping price:</p>
                        <strong>{shippingPrice.toFixed(2)} $</strong>
                    </div>

                    <div className={classes.sumaryItem}>
                        <p>Tax:</p>
                        <strong>{(taxPrice).toFixed(2)} $</strong>
                    </div>
                    
                    <div className={classes.sumaryItem}>
                        <p> Total: </p>
                        <strong>{totalPrice.toFixed(2)} $</strong>
                    </div>
                </div>
                <button 
                    className={classes.submitButton} 
                    type="submit"
                    onClick={placeOrderHandler}
                    disabled={isFetching}
                    >
                    {isFetching 
                        ? "Loading"
                        : "Place Order"
                    }</button>
            </div>
        </div>
    )
}

export default PlaceOrder
