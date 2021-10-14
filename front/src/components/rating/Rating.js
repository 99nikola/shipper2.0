import classes from "./rating.module.css";
import { useMemo } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"


const Rating = ({ num }) => {

    const Stars = useMemo(() => {
        let stars = [];
        for (let i=0; i<num; i++) stars.push(<BsStarFill className={classes.star} key={i} />);
        for (let i=0; i<5-num; i++) stars.push(<BsStar className={classes.star} key={num+10-i} />);

        return stars;
    }, [num]);


    return Stars;
}

export default Rating
