import classes from "./home.module.css"
import { Navbar, Feed, Sidebar } from "../../components/Components";
import { Route, Switch } from "react-router-dom";
import { StorePage, ProductPage, Cart, Orders } from "../Pages";
import { useContext, useEffect, useRef, useState } from "react";
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, MANUAL_UPDATE, SORT } from "../../context/products/ProductsActions";
import axios from "axios";
import { ProductsContext } from "../../context/products/ProductsContext";
import { useSingleton } from "../../utils/utils";
import { SET_CART_ITEMS } from "../../context/cart/CartActions";
import { CartContext } from "../../context/cart/CartContext";
import { SET_ITEMS } from "../../context/slider/SliderActions";

const Home = () => {

    const { category, store, sortBy, ascending, manualUpdate, page, maxPerPage, search, dispatch } = useContext(ProductsContext);
    const { set, dispatch: cartDispatch } = useContext(CartContext);
    const firstLoad = useRef(false);

    const [ menu, setMenu ] = useState(false);

    useSingleton(() => {
        firstLoad.current = true;
    });

    useEffect(() => {
        const shouldFetch = sessionStorage.getItem(store) === null;
        if (!shouldFetch) {
            return;
        }
        dispatch({ type: MANUAL_UPDATE });
    }, [store]);

    useEffect(() => {
        (async () => {
            try {
                const cartIds = JSON.parse(localStorage.getItem("cart"));
                if (cartIds === null || cartIds.length === 0) return;
                
                for (let id of cartIds) {
                    set.add(id);
                }
    
                const { data } = await axios.post("http://localhost:3030/api/feed/cart", { 
                    ids: cartIds  
                });
    
                cartDispatch({ type: SET_CART_ITEMS, payload: data.products });
            } catch (error) {
                console.log(error);
            }
        })();
        return () => dispatch({ SET_ITEMS, payload: [] });
    }, []);


    useEffect(() => { 
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        (async () => {
            let order, dir;
    
            switch (sortBy) {
                case SORT.PRICE: order = "price"; break;
                case SORT.DATE_ADDED: order = "dateAdded"; break;
                case SORT.RATING: order = "rating"; break;
                case SORT.SOLD_COUNT: order = "soldCount"; break;
            }
            switch (ascending) {
                case true: dir = "ASC"; break;
                case false: dir = "DESC"; break;
            }
            
            dispatch({ type: FETCH_PRODUCTS_START });
            try {
                const { data } = await axios.get(`http://localhost:3030/api/feed/query?category=${category}&order=${order}&dir=${dir}&limit=${maxPerPage}&page=${page}&store=${store}&search=${search}`);
                dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
            } catch (error) {
                dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
                console.log(error);
            }   
        })();
    }, [category, sortBy, ascending, page, manualUpdate, search]);

    return (
        <>
            <Navbar setMenu={setMenu} menu={menu} />
            <div className={classes.homeContainer}>
                <Sidebar menu={menu} />
                
                <Switch>
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/store/:username" component={StorePage} />
                    <Route exact path="/:username/product/:id" component={ProductPage} />
    				<Route exact path="/cart" component={Cart} />
                    <Route exact path="/orders/:username" component={Orders} />
                </Switch>
            </div>
        </>
    )
}

export default Home
