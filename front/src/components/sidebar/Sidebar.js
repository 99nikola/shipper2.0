import classes from "./sidebar.module.css"

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Tree from "./Tree";
import { ProductsContext } from "../../context/products/ProductsContext";


const Sidebar = ({ menu }) => {

    const [tree, setTree] = useState([]);
    const { category } = useContext(ProductsContext);
    
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("http://localhost:3030/api/setup/get-categories");
                setTree(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);


    return (
        <div className={menu ? classes.container : `${classes.container} ${classes.containerHide}`} >
            
            <h3 className={classes.header}>Categories</h3>

            <div className={classes.categories}>
                <input 
                    type="radio" 
                    name="lastItem"
                    checked={category === "All"}
                    readOnly={true}
                    hidden={true}
                />
                <Tree data = {tree} />
            </div>

        </div>
    )
}

export default Sidebar
