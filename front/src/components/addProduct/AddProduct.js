import classes from "./addProduct.module.css";
import { BiAddToQueue } from "react-icons/bi"; 
import { useState } from "react";
import { AddProductForm } from "../Components"

const AddProduct = () => {

    const [ show, setShow ] = useState(false);

    const formHandler = () => {
        setShow(!show);
    }

    return (
        <div className={classes.container}>
            {show 
                ? (
                    <AddProductForm callBackHandler={formHandler} />
                )

                : <button 
                    className={classes.addProductButton}
                    onClick={formHandler}
                    >
                        <BiAddToQueue className={classes.addProductIcon} />
                    </button>
            }
        </div>
    )
}

export default AddProduct
