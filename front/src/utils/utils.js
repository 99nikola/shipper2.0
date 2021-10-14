import axios from "axios";
import { useEffect, useRef } from "react";

export const setAuthorizationToken = token => {
    if (token) 
        axios.defaults.headers.authorization = `Bearer ${token}`;
    else
        delete axios.defaults.headers.authorization;
}

export const useSingleton = (callBack = () => {}) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
}

export const usePrevious = (value) => {
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export const useCustomRef = (value) => {
    const ref = useRef();
    ref.current = value;
    
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
}

export const useCartAutoSave = (cartItems, set) => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify([...set]));
    }, [cartItems]);
}