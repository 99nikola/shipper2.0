import classes from "./sidebar.module.css"
import { useContext, useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { ProductsContext } from "../../context/products/ProductsContext";
import { SET_CATEGORY } from "../../context/products/ProductsActions";

const Tree = ({ data = []}) => {

    if (data.length === 0)
        return <></>;
    
    return (
        <ul>
            {data.map(item =>(
                <TreeNode
                    node = {item} 
                    key = {item.id}
                />
            ))}
        </ul>
    )
}

const TreeNode = ({ node }) => {

    const { category, dispatch } = useContext(ProductsContext);
    const nodeRef = useRef();

    const [childVisible, setChildVisible] = useState(false);
    const lastItem = node.children.length === 0 ? true : false;

    useEffect(() => {
        try {
            const value = JSON.parse(sessionStorage.getItem(node.name));
            setChildVisible(value);
            nodeRef.current.checked = value;
        } catch (err) {}

    }, []);
    
    useEffect(() => {
        if (nodeRef.current && category === nodeRef.current.id) {
            nodeRef.current.checked = true;
        }
    }, [category]);

    const onClickHandler = () => {
        if (lastItem) {
            dispatch({ type: SET_CATEGORY, payload: node.name });
            return;
        }
        setChildVisible(!childVisible);
        sessionStorage.setItem(node.name, !childVisible);
    }


    return (
        <li key={node.id} className={classes.item} >
            {lastItem 
                ? <input 
                    className={classes.click}
                    id={node.name} 
                    type="radio" 
                    name="lastItem" 
                    ref={nodeRef}
                    />
                : <input 
                    className={classes.click}
                    type="checkbox"
                    id={node.name}
                    ref={nodeRef}
                    />}
            
            <label htmlFor={node.name}>
                <div className={lastItem 
                        ? `${classes.itemName} ${classes.lastItemClick}`
                        : classes.itemName} onClick={onClickHandler}>

                    {lastItem 
                        ? <div className={classes.notArrow}></div> 
                        : <FiChevronRight className={classes.arrow} />
                    }
                    {node.name}
                </div>
            </label>

            {node.children && childVisible && (
                <div className={classes.childrenContainer} >
                    <Tree 
                        data={node.children}
                        key={node.id}
                    />
                </div>
            )}
        </li>
    )
}

export default Tree
