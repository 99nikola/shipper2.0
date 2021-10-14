import classes from "./storeView.module.css"
import { VscAccount } from "react-icons/vsc"
import Rating from "../rating/Rating";
import { Link } from "react-router-dom";

const StoreView = ({ values }) => {

    const { name, rating, image } = values;

    return (
        <Link
            className={classes.item}
            to={`/store/${values.username}`}
            >
            <div className={classes.container}>
                <div className={classes.profile}>
                    <VscAccount className={classes.profileImg} />
                    {/* <img className="vwprofile-img" src="" alt="IMG HERE"/> */}
                    <h5>{name}</h5>
                </div>
                <div className={classes.rating}>
                    <Rating num={rating}/>
                </div>
                <div className={classes.bestSellers}>
                    <p>Best Sellers </p>
                </div>
            </div>
        </Link>
    )
}

export default StoreView
