import { createContext, useReducer } from "react";
import { SORT } from "./ProductsActions";
import ProductsReducer from "./ProductsReducer";

export const INITIAL_STATE = {
    products: null,
    isFetching: false,
    error: null,
    sortBy: SORT.DATE_ADDED,
    ascending: false,
    maxPerPage: 8,
    comparator: null,
    category: "All",
    page: 1,
    numProducts: 0,
    manualUpdate: 0,
    store: "All",
    search: ""
}

export const ProductsContext = createContext(INITIAL_STATE);

export const ProductsProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(ProductsReducer, INITIAL_STATE);

    return (
        <ProductsContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </ProductsContext.Provider>
    ) 
}