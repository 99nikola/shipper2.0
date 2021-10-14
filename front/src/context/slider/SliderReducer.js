import { FETCH_STORES_FAILURE, FETCH_STORES_START, FETCH_STORES_SUCCESS, SET_HANDLER, SET_ID, SET_INDEXES, SET_ITEMS, SET_NUM_ITEMS, SET_RESPONSIVE } from "./SliderActions";

const SliderReducer = (state, action) => {
    switch(action.type) {
        case FETCH_STORES_START:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_STORES_SUCCESS: case SET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isFetching: false,
                error: false,
                indexes: [...Array(action.payload.length).keys()]
            };

        case FETCH_STORES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case SET_INDEXES:
            return {
                ...state,
                indexes: action.payload
            }

        case SET_NUM_ITEMS:
            return {
                ...state,
                numItemsVisible: action.payload
            }

        case SET_HANDLER:
            return {
                ...state,
                handler: action.payload
            }

        case SET_RESPONSIVE:
            return {
                ...state,
                responsive: action.payload
            }

        case SET_ID:
            return {
                ...state,
                linkId: action.payload
            }

        default:
            return state;
    }
}


export default SliderReducer;