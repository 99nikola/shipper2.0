import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { NEXT_STEP, SET_SHIPPING, PREV_STEP } from "../../context/shipping/ShippingActions";
import { ShippingContext } from "../../context/shipping/ShippingContext";
import classes from "./shippingForm.module.css";

const ShippingForm = () => {

    const { shipping, dispatch } = useContext(ShippingContext);
    const { address, city, country, fullName, postalCode } = shipping;
    const [ fullNameRef, addressRef, cityRef, postalCodeRef, countryRef ] = [ useRef(), useRef(), useRef(), useRef(), useRef() ];

    
    const submitHandler = (e) => {
        e.preventDefault();

        const values = {
            fullName: fullNameRef.current.value,
            address: addressRef.current.value,
            country: countryRef.current.value,
            postalCode: postalCodeRef.current.value,
            city: cityRef.current.value
        }

        localStorage.setItem("shipping", JSON.stringify(values));

        dispatch({ type: SET_SHIPPING, payload: values });
        dispatch({ type: NEXT_STEP });
    }
    
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.header}>
                <h1>Shipping Address</h1>
            </div>
            <div className={classes.item}>
                <input 
                    className={classes.input}
                    type="text" 
                    id="fullName" 
                    placeholder="Enter full name" 
                    ref={fullNameRef} 
                    defaultValue={fullName}
                    required 
                    />
            </div>
            <div className={classes.item}>
                <input 
                    className={classes.input}
                    type="text" 
                    id="address" 
                    placeholder="Enter address" 
                    ref={addressRef} 
                    defaultValue={address}
                    required 
                    />
            </div>
            <div className={classes.item}>
                <input 
                    className={classes.input}
                    type="text" 
                    id="city" 
                    placeholder="Enter city" 
                    ref={cityRef} 
                    defaultValue={city}
                    required 
                    />
            </div>
            <div className={classes.item}>
                <input 
                    className={classes.input}
                    type="text" 
                    id="postalCode" 
                    placeholder="Enter postal code" 
                    ref={postalCodeRef} 
                    defaultValue={postalCode}
                    required 
                    />
            </div>
            <div className={classes.item}>
                <input 
                    className={classes.input}
                    type="text" 
                    id="country" 
                    placeholder="Enter country" 
                    ref={countryRef} 
                    defaultValue={country}
                    required 
                    />
            </div>

            <div>
                <button className={classes.submitButton} type="submit">
                    Continue
                </button>
            </div>
        </form>
    );
}

export default ShippingForm
