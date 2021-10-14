import { useContext, useEffect, useState } from "react";
import { SET_HANDLER, SET_ID, SET_ITEMS } from "../../context/slider/SliderActions";
import { SliderContext } from "../../context/slider/SliderContext";
import { Slider } from "../Components";
import classes from "./imageSlider.module.css";
import ImageView from "./ImageView";

const ImageSlider = ({ images }) => {

    const [ main, setMain ] = useState({});
    const { items, dispatch } = useContext(SliderContext);

    useEffect(() => {
        switch (items.length) {
            case 0:
                break;
            case 1 : 
                dispatch({ type: SET_ID, payload: items[0].id});
                break;
            
            default: 
                dispatch({ type: SET_ID, payload: items[1].id });

        }
    }, [items]);
    
    const selectHandler = (e) => {
        setMain({ image: e.target.src });
        dispatch({ type: SET_ID, payload: parseInt(e.target.id) });
    }

    useEffect(() => {
        dispatch({ type: SET_HANDLER, payload: selectHandler });
        return () => {
            dispatch({ type: SET_ITEMS, payload: [] });
            dispatch({ type: SET_HANDLER, payload: null });
        }
    }, []);
    
    useEffect(() => {
        if (images.length === 0) {
            return;
        }
        
        dispatch({ type: SET_ITEMS, payload: images });
        setMain({ image: images[0].image, id: images[0].id }); 

        return () => dispatch({ type: SET_ITEMS, payload: [] });
    }, [images]);

    if (images.length === 0) {
        return (
            <div className={classes.imageSlider}>
                <img className={classes.image} src="https://image.flaticon.com/icons/png/512/15/15389.png" />
            </div>
        );
    }

    if (!main) 
        return (<></>);

    return (
        <div className={classes.imageSlider}>
            <div className={classes.show}>
                <img 
                    className={classes.mainImage}
                    src={main.image}
                    />
            </div>

            <div className={classes.slider}>
                <Slider Component={ImageView} />
            </div>
        </div>
    )
}

export default ImageSlider
