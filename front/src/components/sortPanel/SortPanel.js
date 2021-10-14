import classes from "./sortPanel.module.css"
import { MdSort } from "react-icons/md"
import { useContext, useEffect, useRef } from "react"
import { ProductsContext } from "../../context/products/ProductsContext"
import { SET_ASC, SET_MPP, SET_SORTBY, SORT, SET_PAGE, RESET, MANUAL_UPDATE, SET_SORT_VALUES } from "../../context/products/ProductsActions"
import { useCustomRef, usePrevious } from "../../utils/utils"
import { useParams } from "react-router-dom"

const SortPanel = () => {
    
    const { category, sortBy, ascending, dispatch, maxPerPage, numProducts, page } = useContext(ProductsContext);

    const catRef = useCustomRef(category);
    const mppRef = useCustomRef(maxPerPage);
    const sortRef = useCustomRef(sortBy);
    const ascRef = useCustomRef(ascending);   
    const pageRef = useCustomRef(page);

    const shouldPageUpdate = useRef(false);
    
    const prevMPP = usePrevious(maxPerPage);
    const { username } = useParams();

    const loadState = () => {
        try {
            const values = JSON.parse(sessionStorage.getItem(username === undefined ? "All" : username));
            if (values === null) {
                dispatch({ type: RESET });
                return;
            }
            dispatch({ type: SET_SORT_VALUES, payload: values });
            if (values.maxPerPage !== 8) shouldPageUpdate.current = true;

            dispatch({ type: MANUAL_UPDATE });

        } catch (err) {
            console.error(err);
        }
    }


    const saveState = () => {
        if (!sortRef) {
            return;
        }

        const save = {
            category: catRef.current,
            maxPerPage: mppRef.current,
            sortBy: sortRef.current,
            ascending: ascRef.current,
            page: pageRef.current,
        }

        try {
            sessionStorage.setItem(username === undefined ? "All" : username, JSON.stringify(save));
        } catch (error) {
            sessionStorage.clear();
            sessionStorage.setItem(username === undefined ? "All" : username, JSON.stringify(save));
            // if (error == DOMException.QUOTA_EXCEEDED_ERR) {
            //     sessionStorage.clear();
            // }
        }
    }

    useEffect(() => {
        loadState();
        window.addEventListener("beforeunload", saveState);
        
        return () => {
            window.removeEventListener("beforeunload", saveState);
            saveState();
        };
    }, []);


    useEffect(() => {
        if (!prevMPP) return;


        if (page === 1) {
            dispatch({ type: MANUAL_UPDATE });
            return;
        }

        if (shouldPageUpdate.current) {
            shouldPageUpdate.current = false;
            return;
        }

        let productsViewed = prevMPP * page ;

        if (productsViewed > numProducts) {
            productsViewed = numProducts;
        }
        
        let newPage = Math.ceil((productsViewed) / maxPerPage);
        if (newPage % maxPerPage === 0) {
            newPage++;
        }
        dispatch({ type: SET_PAGE, payload: newPage });

        return () => dispatch({ type: SET_PAGE, payload: 1 });
    }, [maxPerPage]);


    const maxPerPageHandler = (e) => {
        dispatch({ type: SET_MPP, payload: parseInt(e.target.value) });
    }

    const sortByHandler = (e) => {
        dispatch({ type: SET_SORTBY, payload: parseInt(e.target.value) });
    }

    const sortHandler = () => {
        dispatch({ type: SET_ASC, payload: !ascending});
    }

    return (
        <div className={classes.filter}>

            <label className={classes.infoText} htmlFor="number"> Items found: 
                <span className={classes.infoNumber} name="number">{numProducts}</span>
            </label>

            <label className={classes.infoText}> Category:
                <span className={classes.infoNumber}>
                    {category}
                </span>
            </label>

            <label className={classes.infoText}> Store:
                <span className={classes.infoNumber}>
                    {username === undefined ? "All" : username}
                </span>
            </label>
            
            <label className={classes.infoText} htmlFor="show"> Show:
                <select 
                    className={classes.numItems} 
                    name="show"
                    onChange={maxPerPageHandler}
                    value={maxPerPage}
                    defaultChecked={maxPerPage}
                >
                    <option className={classes.opt}>8</option>
                    <option className={classes.opt}>16</option>
                    <option className={classes.opt}>32</option>
                </select>
            </label>

            <div className={classes.sortContainer}>
                <label className={classes.infoText}>Sort by:
                    <select 
                        className={classes.sortBy}
                        onChange={sortByHandler}
                        value={sortBy}
                    >
                        <option value={SORT.PRICE}>Price</option>
                        <option value={SORT.DATE_ADDED}>Date Added</option>
                        <option value={SORT.RATING}>Rating</option>
                        <option value={SORT.SOLD_COUNT}>Sold Count</option>
                    </select>
                </label>
                
                <label htmlFor="clickSort">
                    <input 
                        className={classes.sort} 
                        hidden={true}
                        type="checkbox" 
                        id="clickSort" 
                        onChange={sortHandler}
                        checked={ascending}
                    />
                    <MdSort className={classes.sortIcon} />
                </label>
            </div>

        </div>
    )
}

export default SortPanel
