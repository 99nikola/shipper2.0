import classes from "./style.module.css"
import { MdAccountBox } from "react-icons/md"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Rating from "../../components/rating/Rating"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth/AuthContext"
import { FaRegEdit } from "react-icons/fa";
import { ProductsPanel, SortPanel, AddProduct } from "../../components/Components";
import { SET_AUTHORITY } from "../../context/auth/AuthActions"
import { SET_STORE } from "../../context/products/ProductsActions"
import { ProductsContext } from "../../context/products/ProductsContext"

const StorePage = () => {

    const { username } = useParams();
    const [ currUser, setCurrUser ] = useState();
    const [ following, setFollowing ] = useState(false);
    const { user, loggedIn, authorized, dispatch: authDispatch} = useContext(AuthContext);
    const { dispatch } = useContext(ProductsContext);

    useEffect(() => {
        dispatch({ type: SET_STORE, payload: username }); 

        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3030/api/feed/user/${username}`);
                setCurrUser(data.user);
            } catch (error) {
                console.log(error);
            }
        })();

        return () => {
            dispatch({ type: SET_STORE, payload: "All" });
            authDispatch({ type: SET_AUTHORITY, payload: false });
        }
    }, []);

    useEffect(() => {
        if (!loggedIn) 
            return;
        
        if (user.username !== username) {
            (async () => {
                try {
                    const { data } = await axios.get(`http://localhost:3030/api/users/checkFollow?follower_un=${user.username}&following_un=${username}`);
                    setFollowing(data.following);
                } catch (error) {
                    console.error(error);
                }
            })();
            return;
        }

        setCurrUser(user);
        authDispatch({ type: SET_AUTHORITY, payload: true });

    }, [ loggedIn ]);

    const followHandler = async () => {
        console.log(typeof following);
        const { data } = await axios.put(`http://localhost:3030/api/users/follow/${username}`, { username: user.username });
        setFollowing(data.following);
    }

    if (!currUser)
        return <></>;

    return (
           
        <div className={classes.profileContainer} >

            <img className={classes.cover} src={currUser?.cover_img ? currUser.cover_img : "https://wallpapercave.com/wp/wp6990645.png"} alt="Store Cover" />

            <div className={classes.info} >
                { currUser?.logo_img 
                    ? <img src={currUser?.logo_img} alt="profile img" className={classes.profileImg} /> 
                    : <MdAccountBox className={classes.profileImg} />}
                
                <div className={classes.desc}>
                    <div className={classes.infoItem} key={1}>
                        <h5 className={classes.infoHeading} >name: </h5>
                        <h4 className={classes.infoName}>{currUser?.name ? currUser.name : username +"'s store"}</h4>
                    </div>

                    <div className={classes.infoItem} key={2}>
                        <h5 className={classes.infoHeading} >rating:</h5>
                        <Rating num={currUser?.rating}/>
                    </div>

                    <div className={classes.infoItem} key={3}>
                        <h5 className={classes.infoHeading}>Status:</h5>
                        <p className={classes.infoStatus} >{currUser?.status ? currUser.status : "Welcome"}</p>
                    </div>
                </div>

                {loggedIn && (
                    user.username !== username 
                        ? (
                            <button
                                className={classes.btnFollow}
                                onClick={followHandler}
                                >
                                {following ? "Unfollow" : "Follow"}
                            </button>
                        ) 
                        : <FaRegEdit />
                    
                )}
            </div>
                {authorized && (
                    <AddProduct />
                )}
            <SortPanel />
            <ProductsPanel plus={authorized ? false : true} />
        </div>
    )
}

export default StorePage
