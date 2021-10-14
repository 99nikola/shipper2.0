import classes from "./navbar.module.css"
import { MdExitToApp, MdMenu} from "react-icons/md"
import { CgFeed } from "react-icons/cg"
import { RiShoppingCart2Line, RiStore3Line } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs"
import { useContext, useRef } from "react"
import { AuthContext } from "../../context/auth/AuthContext"
import { Link } from "react-router-dom"
import { LOGOUT } from "../../context/auth/AuthActions"
import { CartContext } from "../../context/cart/CartContext";
import { ProductsContext } from "../../context/products/ProductsContext";
import { SET_SEARCH } from "../../context/products/ProductsActions";
import { FaShippingFast } from "react-icons/fa";


const Navbar = ({ menu, setMenu }) => {

   const { user, loggedIn, isFetching, dispatch } = useContext(AuthContext);
   const { cartItems } = useContext(CartContext);
   const searchRef = useRef();

   const { dispatch: productsDispatch, store } = useContext(ProductsContext);

   const logoutHandler = () => {
      dispatch({ type: LOGOUT });
      localStorage.removeItem("shipperToken");
   }

   const searchHandler = (e) => {
      if (e.key !== "Enter") return;
      productsDispatch({ type: SET_SEARCH, payload: searchRef.current.value });
   }
   
   return (
      <div className={classes.container}>
         
         <div className={classes.left}>
            {/* <span className={classes.logo}>Shipper</span> */}
            <input 
               className={classes.menuCheckbox} 
               type="checkbox" 
               id="menu" 
               checked={menu}
               onChange={() => setMenu(!menu)}
               />
            <label htmlFor="menu">
               <div className={classes.linkItem}>
                  <MdMenu className={classes.menuIcon} />
               </div>
            </label>
            {loggedIn && (
            <Link className={classes.link} to={`/store/${user?.username}`}>
               <div className={classes.rightItem}>
                     <span className={classes.link}>MyStore</span>
                     <RiStore3Line className={classes.icon} />
               </div>
            </Link>
            )}

            <Link className={classes.itemLink} to="/">
               <div className={classes.linkItem}>
                  <CgFeed className={classes.icon} />
                  <span className={classes.link}>Feed</span>
               </div>
            </Link>
         </div>

         <div className={classes.center}>
            <div className={classes.searchbar}>
               <BsSearch className={classes.searchIcon} />
               <input 
                  placeholder={store === "All" ? "Search for products" : `Search for products in ${store}'s store`} 
                  className={classes.searchInput} 
                  onKeyDown={searchHandler}
                  ref={searchRef}
                  />
            </div>
         </div>

         <div className={classes.right}>

            {isFetching 
               ? (
                  <VscLoading className={classes.loadingIcon} />
               )
               : (
                  loggedIn 
               ? (<>
                  <Link onClick={logoutHandler} className={classes.itemLink} to="/login">
                     <div className={classes.rightItem}>
                        <div className={classes.icon}>
                           <MdExitToApp className={classes.icon} />
                        </div>
                     </div>
                  </Link>
                  <Link className={classes.link} to={`/orders/${user?.username}`}>
                     <div className={classes.rightItem}>
                        <span className={classes.link}>My Orders</span>
                        <FaShippingFast className={classes.icon} />
                     </div>
                  </Link>
               </>)
                  : (<>
                     <div className={`${classes.rightItem} ${classes.lr}`}>
                        <h4 className={classes.lrItem}>Login</h4>
                        <h6>or</h6>
                        <h4 className={classes.lrItem}>Register</h4>
                        <div className={classes.hiddenList}>
                           <Link className={classes.aLink} to="/login">
                              <label>Login</label>
                           </Link>
                           <Link className={classes.aLink} to="/register">
                              <label>Register</label>
                           </Link>
                        </div>
                     </div>
                  </>
                  )      
               )
                  
            }
            <Link className={classes.link} to="/cart">
               <div className={classes.rightItem}>
                  <RiShoppingCart2Line className={classes.icon} />
                  <span className={classes.iconbadge}>{cartItems.length}</span>
               </div>
            </Link>
            

         </div>
      </div>
      )
}

export default Navbar
