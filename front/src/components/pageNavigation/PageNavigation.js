import { useContext, useRef } from "react";
import { SET_PAGE } from "../../context/products/ProductsActions";
import { ProductsContext } from "../../context/products/ProductsContext";
import classes from "./pageNavigation.module.css"

const PageNavigation = () => {

    const { isFetching, numProducts, page, maxPerPage, dispatch } = useContext(ProductsContext);
    const pageRef = useRef();

    const previousPageHandler = () => {
        dispatch({ type: SET_PAGE, payload: page-1 });
    }
    
    const nextPageHandler = () => {
        dispatch({ type: SET_PAGE, payload: page+1 });
    }

    return (
        <div className={classes.pages}>
            <button 
                className={classes.nextPage}
                onClick={previousPageHandler}
                disabled={isFetching || numProducts === 0 || page === 1}
            >
            -
            </button> 
            
            <button 
                className={classes.currentPage}
                value={page}
                ref={pageRef}
                
                > 
                { isFetching ? "Loading" : `Page: ${page}` }
            </button>
            
            <button 
                className={classes.nextPage}
                onClick={nextPageHandler}
                disabled={isFetching || numProducts === 0 || page === Math.ceil(numProducts / maxPerPage)}
            >
            +
            </button>
        </div>
    );
}

export default PageNavigation
