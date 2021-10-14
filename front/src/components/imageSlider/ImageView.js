import { useContext } from "react"
import { SliderContext } from "../../context/slider/SliderContext"
import classes from "./imageSlider.module.css";

const ImageView = ({ values }) => {

    const { handler, linkId } = useContext(SliderContext);

    return (
        <div className={classes.sliderItem}>
            <img 
                className={linkId === values.id ? `${classes.sliderImage} ${classes.sliderImageSelected}` : classes.sliderImage}
                key={values.id}
                id={values.id} 
                src={values.image}
                onClick={handler} 
                />
        </div>
    )
}

export default ImageView
