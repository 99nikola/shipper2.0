import { createContext, useReducer } from "react";
import SliderReducer from "./SliderReducer"

const responsive = [
    {
        breakpoint: 400,
        items: 3
    },
    {
       breakpoint: 720,
       items: 5
    },
    {
       breakpoint: 1024,
       items: 6
    },
    {
       breakpoint: 2000,
       items: 8
    },
    {
       breakpoint: 4000,
       items: 10
    }
];

const INITIAL_STATE = {
    indexes: [],
    items: [],
    numItemsVisible: 0,
    isFetching: false,
    error: false,
    responsive,
    handler: null,
    linkId: null,
}

export const SliderContext = createContext(INITIAL_STATE);

export const SliderContextProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(SliderReducer, INITIAL_STATE);

    return (
        <SliderContext.Provider
            value={{
                ...state,
                dispatch
            }}
        >
            {children}
        </SliderContext.Provider>
    )
}