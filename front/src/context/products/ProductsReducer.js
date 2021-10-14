import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, SET_ASC, SET_CATEGORY, SET_COMP, SET_NUM_PRODUCTS, SET_MPP, SET_SORTBY, SET_PAGE, RESET, SORT, MANUAL_UPDATE, SET_STORE, SET_SORT_VALUES, SET_SEARCH } from "./ProductsActions";

const ProductsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload,
                error: false
            }
            
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case SET_MPP:
            return {
                ...state,
                maxPerPage: action.payload
            }
        
        case SET_SORTBY:
            return {
                ...state,
                sortBy: action.payload
            }
        
        case SET_ASC:
            return {
                ...state,
                ascending: action.payload
            }

        case SET_COMP:
            return {
                ...state,
                comparator: action.payload
            }

        case SET_CATEGORY: 
            return {
                ...state,
                category: action.payload
            }
        
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_NUM_PRODUCTS:
            return {
                ...state,
                numProducts: action.payload
            }
        case RESET:
            return {
                ...state,
                sortBy: SORT.DATE_ADDED,
                ascending: false,
                maxPerPage: 8,
                category: "All",
                page: 1,
            }

        case MANUAL_UPDATE:
            return {
                ...state,
                manualUpdate: 1 - state.manualUpdate
            }
        case SET_STORE:
            return {
                ...state,
                store: action.payload
            }
        
        case SET_SORT_VALUES:
            return {
                ...state,
                ...action.payload
            }
        
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }

        default:
            return state;
    }
}

export default ProductsReducer
