import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { MANUAL_UPDATE } from "../../context/products/ProductsActions";
import { ProductsContext } from "../../context/products/ProductsContext";
import classes from "./addProductForm.module.css";

const AddProductForm = ({ callBackHandler, values, update, updateHandler, updated }) => {

    const [ categories, setCategories ] = useState([]);
    const [ urlImage, setUrlInsted ] = useState(true);
    const [ success, setSuccess] = useState(false);
    const [ images, setImages ] = useState([]);
    const [ category, setCategory ] = useState(values?.category);
    const { user } = useContext(AuthContext);

    const [ nameRef, priceRef, imageRef, quantityRef, categoryRef, descRef ] = [ useRef(), useRef(), useRef(), useRef(), useRef(), useRef() ];
    const { dispatch } = useContext(ProductsContext);

    useEffect(() => {
        if (values && values.images !== 0) {
            setImages(values.images);
        }

        (async () => {
            try {
                const { data } = await axios.get("http://localhost:3030/api/setup/categoryLeaves");
                setCategories(data.categories);
            } catch (error) {
                console.error(error);
            }   
        })();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        let product = {};

        let value = nameRef.current.value;
        if (values === undefined || values.name !== value) product.name = value;
        
        value = parseInt(priceRef.current.value);
        if (values === undefined || values.price !== value) product.price = value;

        value = parseInt(quantityRef.current.value);
        if (values === undefined || values.quantity !== value) product.quantity = value;
        
        value = categoryRef.current.value;
        if (values === undefined || values.category !== value) product.category = value;

        value = descRef.current.value;
        if (values === undefined || (value.length !== 0 && value !== values.description)) product.description = value;

        if (images.length !== 0 && (values === undefined || values.images !== images)) product.images = images.map(item => item.image);

        if (Object.keys(product).length === 0) {
            setSuccess(true);
            setTimeout(() => callBackHandler(), 2000);
            return;
        }
            
        (async () => {
            try {
                update
                    ? await axios.put(`http://localhost:3030/api/products/update/${update}/${user.username}`, product)
                    : await axios.post(`http://localhost:3030/api/products/add/${user.username}`, product);
                setSuccess(true);
                setTimeout(() => callBackHandler(), 2000);

                if (update) {
                    updateHandler(1 - updated);
                } else {
                    dispatch({ type: MANUAL_UPDATE });
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }

    const nextHandler = (e) => {
        const image = imageRef.current.value;
        if (!image) return;

        const clone = images.slice(0);
        clone.push({ image });
        setImages(clone);
        imageRef.current.value = "";
    }

    const selectHandler = (e) => {
        setCategory(e.target.value);
    }

    if (success) {
        return (
            <div className={classes.success}>
                <h3>Product {update ? "updated" : "added"} successfully.</h3>
            </div>
        );
    }

    return (
            <form className={classes.container} onSubmit={submitHandler} >
                    
                <input 
                    className={classes.input}
                    type="text" 
                    placeholder="Product name"
                    required
                    ref={nameRef}
                    defaultValue={values && values.name}
                    />

                <input 
                    className={classes.input}
                    type="text" 
                    placeholder="Price"
                    required
                    ref={priceRef}
                    defaultValue={values && values.price}
                    />

                <label html="prodImage">Image:
                    {urlImage 
                        ? (
                        <input  
                            placeholder="https://example.com"
                            pattern="https://.*" size="30"
                            ref={imageRef}
                            />
                        ) 
                        : (
                            <input 
                                id="prodImage"
                                type="file"  
                                accept=".png, .jpeg, .jpg"
                                required
                                ref={imageRef}
                            />
                        )}

                        <select className={classes.listImages}>
                            {images.map((item, index) => 
                                <option 
                                    key={index}
                                    className={classes.listImage}
                                    >
                                {item.image}
                                </option>
                                )}
                        </select>

                        <input 
                            type="button"
                            value="next"
                            onClick={nextHandler}
                            />
                </label>         
                <div className={classes.imageRadio}>
                    <label>
                        <input 
                            type="radio" 
                            name="prodImage" 
                            onChange={() => setUrlInsted(false)}
                            />
                        Custom
                    </label>

                    <label>
                        <input 
                            defaultChecked={true}
                            type="radio" 
                            name="prodImage" 
                            onChange={() => setUrlInsted(true)}
                            />
                        URL
                    </label>
                </div>
                    
                
                <label htmlFor="prodQuantity">Quantity:
                    <input 
                        className={classes.input}
                        id="prodQuantity"
                        type="number" 
                        defaultValue={values ? values.quantity : 1}
                        ref={quantityRef}
                        />
                </label>
                <select 
                    className={classes.input}
                    name="category"
                    ref={categoryRef}
                    value={category}
                    onChange={selectHandler}
                    >
                    {categories.map((category, index) => 
                        <option 
                            key={index}
                            value={category.name}
                            >
                            {category.name}</option>    
                    )}
                </select>
                <label>Description:
                    <textarea 
                        ref={descRef}
                        defaultValue={values && values.description}
                        />
                </label>
                <div className={classes.formButtons}>
                    <input type="submit" value="Submit" />
                    <input type="reset" value="Reset" />
                </div>
                <button onClick={callBackHandler}>Cancel</button>
            </form>
    )
}

export default AddProductForm
