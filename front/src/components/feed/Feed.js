import classes from "./feed.module.css"
import { Slider, SortPanel, ProductsPanel, StoreView } from "../Components"
import { useContext, useEffect } from "react";
import { SliderContext } from "../../context/slider/SliderContext";
import { FETCH_STORES_FAILURE, FETCH_STORES_START, FETCH_STORES_SUCCESS, SET_ITEMS } from "../../context/slider/SliderActions";
import axios from "axios";

const Feed = () => {

    const { dispatch } = useContext(SliderContext);

    useEffect(() => {
        (async () => {
            dispatch({ type: FETCH_STORES_START });
            try {
               const { data } = await axios.get("http://localhost:3030/api/feed/topStores/10");
               dispatch({ type: FETCH_STORES_SUCCESS, payload: data.stores });
            } catch (err) {
               dispatch({ type: FETCH_STORES_FAILURE, payload: err });
            }
         })();

         return () => dispatch({ type: SET_ITEMS, payload: [] });
    }, []);
    return (
        <div className={classes.container}>
            <div className={classes.storeSlider}>
                <Slider Component={StoreView} />
            </div>
            <div className={classes.sortPanel}>
                <SortPanel />   
            </div>
            <ProductsPanel plus={true} />
        </div>
    )
}

export default Feed
