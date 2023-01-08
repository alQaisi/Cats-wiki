import { cls } from "../../../lib/cls";
import styles from "./rating.module.scss";
import { RATING_PROPS } from "../../../types/rating.props";
import { Children } from "react";

const Rating:React.FC<RATING_PROPS>=({rating})=>{
    return(
        <p className={cls("text medium",styles.ratingContainer)}>
            <span className="bold">{rating[0]}:</span>
            <span className={styles.ratingWrapper}>
                { Children.toArray((new Array(5).fill(0)).map((elem,index)=><span className={cls(styles.rating,{[styles.active]:rating[1]>=index+1})}></span>)) }
            </span>
        </p>
    );
}

export default Rating;